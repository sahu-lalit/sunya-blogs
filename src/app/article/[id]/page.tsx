import ArticleDetail from '../../../components/ArticleDetail';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const articleId = parseInt(resolvedParams.id);
  
  if (isNaN(articleId)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" style={{ fontFamily: 'Poppins-Medium, sans-serif' }}>
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-[#AA1650] mb-4">Invalid Article ID</h2>
          <p className="text-gray-600">The article ID provided is not valid.</p>
        </div>
      </div>
    );
  }

  return <ArticleDetail articleId={articleId} />;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const articleId = parseInt(resolvedParams.id);
  
  if (isNaN(articleId)) {
    return {
      title: 'Invalid Article - Sunya IAS Blog',
      description: 'The requested article could not be found.',
    };
  }

  // You can fetch the article data here for better SEO
  return {
    title: `Article ${articleId} - Sunya IAS Blog`,
    description: 'Read the latest educational content for UPSC preparation.',
  };
}