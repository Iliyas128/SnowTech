import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Send, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { z } from 'zod';

const contactInfo = [
  { icon: Phone, label: '+7 (706) 700-70-52', href: 'tel:+77067007052' },
  { icon: Mail, label: 'Weking128@icloud.com', href: 'mailto:Weking128@icloud.com' },
  { icon: MapPin, label: 'Astana, Kazakhstan', href: '#' },
];

const messengerButtons = [
  { 
    icon: MessageCircle, 
    label: 'WhatsApp', 
    href: 'https://wa.me/77067007052',
    color: 'hover:bg-green-500/20 hover:border-green-500/50 hover:text-green-400',
  },
  { 
    icon: Send, 
    label: 'Telegram', 
    href: 'https://t.me/+77067007052',
    color: 'hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-400',
  },
];

const ContactSection = () => {
  const { t, language } = useLanguage();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const { toast } = useToast();

  const contactSchema = z.object({
    name: z.string().trim().min(2, language === 'kz' ? 'Ат тым қысқа' : language === 'en' ? 'Name too short' : 'Имя слишком короткое').max(100),
    email: z.string().trim().email(language === 'kz' ? 'Қате email' : language === 'en' ? 'Invalid email' : 'Некорректный email').max(255),
    phone: z.string().trim().min(10, language === 'kz' ? 'Қате нөмір' : language === 'en' ? 'Invalid phone' : 'Некорректный номер').max(20).optional().or(z.literal('')),
    message: z.string().trim().min(10, language === 'kz' ? 'Хабарлама тым қысқа' : language === 'en' ? 'Message too short' : 'Сообщение слишком короткое').max(1000),
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    const { name, email, phone, message } = result.data;

    try {
      const baseText = `Новая заявка с сайта SnowTEch:
      
Имя: ${name}
Email: ${email}
Телефон: ${phone || 'не указан'}

Сообщение:
${message}`;

      const encodedText = encodeURIComponent(baseText);

      // Открываем WhatsApp с текстом заявки
      window.open(`https://wa.me/77067007052?text=${encodedText}`, '_blank');

      // Открываем окно отправки в Telegram (пользователь выберет чат)
      window.open(`https://t.me/share/url?url=&text=${encodedText}`, '_blank');

      toast({
        title: t('contact.form.success'),
        description: t('contact.form.successDesc'),
      });

      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Contact form submission error', error);
      toast({
        title: 'Ошибка отправки',
        description: 'Не удалось открыть почту или WhatsApp. Попробуйте написать нам напрямую.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="relative py-[clamp(3rem,8vw,6rem)]">
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-background to-background" />
      
      <div className="w-full px-[clamp(1rem,4vw,2.5rem)] relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-[clamp(2rem,5vw,4rem)]"
        >
          <span className="inline-block rounded-full glass font-medium text-primary px-[clamp(0.75rem,1.5vw,1rem)] py-[clamp(0.35rem,0.7vw,0.5rem)] text-[clamp(0.75rem,1vw,0.9rem)] mb-[clamp(0.75rem,1.5vw,1rem)]">
            {t('contact.badge')}
          </span>
          <h2 className="font-bold text-foreground mb-[clamp(0.75rem,1.5vw,1rem)] text-[clamp(1.75rem,4.5vw,3.25rem)] leading-tight">
            {t('contact.title')} <span className="gradient-text">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground mx-auto text-[clamp(0.9rem,1.3vw,1.05rem)] max-w-[clamp(18rem,60vw,42rem)] leading-relaxed">
            {t('contact.description')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-[clamp(1.5rem,4vw,3rem)] w-full max-w-[clamp(20rem,95vw,72rem)] mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass-card space-y-[clamp(0.75rem,1.5vw,1.25rem)] p-[clamp(1.25rem,3vw,2rem)]">
              <h3 className="font-semibold text-foreground mb-2 text-[clamp(1.05rem,1.6vw,1.35rem)]">{t('contact.form.submit')}</h3>
              
              <div>
                <Input
                  name="name"
                  placeholder={t('contact.form.name')}
                  value={formData.name}
                  onChange={handleChange}
                  className={`bg-secondary/50 border-border focus:border-primary h-12 ${errors.name ? 'border-destructive' : ''}`}
                />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder={t('contact.form.email')}
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-secondary/50 border-border focus:border-primary h-12 ${errors.email ? 'border-destructive' : ''}`}
                />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
              </div>

              <div>
                <Input
                  name="phone"
                  type="tel"
                  placeholder={t('contact.form.phone')}
                  value={formData.phone}
                  onChange={handleChange}
                  className={`bg-secondary/50 border-border focus:border-primary h-12 ${errors.phone ? 'border-destructive' : ''}`}
                />
                {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder={t('contact.form.message')}
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`bg-secondary/50 border-border focus:border-primary resize-none ${errors.message ? 'border-destructive' : ''}`}
                />
                {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? '...' : t('contact.form.submit')}
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-[clamp(1rem,2vw,1.5rem)]"
          >
            <div className="glass-card p-[clamp(1.25rem,3vw,2rem)]">
              <h3 className="font-semibold text-foreground mb-[clamp(0.75rem,1.5vw,1.25rem)] text-[clamp(1.05rem,1.6vw,1.35rem)]">{t('contact.messenger')}</h3>
              
              <div className="flex gap-[clamp(0.5rem,1.5vw,1rem)]">
                {messengerButtons.map((btn) => {
                  const Icon = btn.icon;
                  return (
                    <a
                      key={btn.label}
                      href={btn.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 glass-card text-center transition-all duration-300 py-[clamp(1rem,2.5vw,1.5rem)] ${btn.color}`}
                    >
                      <Icon className="w-[clamp(1.5rem,2.5vw,2rem)] h-[clamp(1.5rem,2.5vw,2rem)] mx-auto mb-2" />
                      <span className="font-medium text-[clamp(0.8rem,1.1vw,0.95rem)]">{btn.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="glass-card p-[clamp(1.25rem,3vw,2rem)]">
              <h3 className="font-semibold text-foreground mb-[clamp(0.75rem,1.5vw,1.25rem)] text-[clamp(1.05rem,1.6vw,1.35rem)]">{t('nav.contacts')}</h3>
              
              <div className="space-y-[clamp(0.75rem,1.5vw,1rem)]">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-[clamp(0.75rem,1.5vw,1rem)] text-muted-foreground hover:text-primary transition-colors duration-300 text-[clamp(0.9rem,1.2vw,1rem)]"
                    >
                      <div className="rounded-xl bg-secondary flex items-center justify-center w-[clamp(2.25rem,2.8vw,2.75rem)] h-[clamp(2.25rem,2.8vw,2.75rem)] shrink-0">
                        <Icon className="w-[clamp(1.1rem,1.4vw,1.3rem)] h-[clamp(1.1rem,1.4vw,1.3rem)]" />
                      </div>
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
