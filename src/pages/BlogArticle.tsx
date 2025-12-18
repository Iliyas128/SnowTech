import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { articles } from './Blog';
import ReactMarkdown from 'react-markdown';

const BlogArticle = () => {
  const { slug } = useParams();
  const article = articles.find(a => a.id === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Статья не найдена</h1>
            <Link to="/blog">
              <Button variant="hero">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Вернуться в блог
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} | SnowTEch Blog</title>
        <meta name="description" content={article.excerpt} />
        <meta name="keywords" content={`${article.category}, маркетинг, реклама Казахстан`} />
        <link rel="canonical" href={`https://snowtech.kz/blog/${article.id}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-32 pb-24">
          <article className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                to="/blog"
                className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-300 mb-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад в блог
              </Link>

              <div className="mb-8">
                <span className="inline-flex items-center px-3 py-1 rounded-full glass text-sm text-primary font-medium mb-4">
                  <Tag className="w-3 h-3 mr-1" />
                  {article.category}
                </span>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  {article.title}
                </h1>

                <p className="text-xl text-muted-foreground mb-6">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Share2 className="w-4 h-4" />
                    Поделиться
                  </button>
                </div>
              </div>

              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-invert prose-lg max-w-none
                prose-headings:text-foreground prose-headings:font-semibold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-li:text-muted-foreground
                prose-strong:text-foreground
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-table:w-full
                prose-th:text-left prose-th:p-3 prose-th:bg-secondary prose-th:text-foreground
                prose-td:p-3 prose-td:border-t prose-td:border-border"
              >
                <ReactMarkdown>{article.content}</ReactMarkdown>
              </div>

              <div className="mt-16 p-8 glass-card text-center">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Нужна помощь с маркетингом?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Настроим рекламу и привлечём клиентов для вашего бизнеса
                </p>
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => window.location.href = '/#contacts'}
                >
                  Получить консультацию
                </Button>
              </div>
            </motion.div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogArticle;