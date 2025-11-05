

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './styles.module.css';
import { PortfolioData, PortfolioItem } from './types';

const PortfolioDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);
  const [currentPortfolioData, setCurrentPortfolioData] = useState<PortfolioItem | null>(null);
  const [relatedPortfolios, setRelatedPortfolios] = useState<PortfolioItem[]>([]);

  // 模拟作品数据
  const portfolioData: PortfolioData = {
    'portfolio-1': {
      title: '健康管理APP',
      category: 'UI设计',
      date: '2024.01',
      views: '1.2k',
      description: '这是一款专注于用户健康数据管理的移动应用，旨在帮助用户更好地了解和管理自己的健康状况。应用集成了多种健康监测功能，为用户提供全方位的健康管理解决方案。',
      mediaType: 'image',
      mainMedia: 'https://s.coze.cn/image/K8lGt-azfbE/',
      mediaAlt: '健康管理APP主界面',
      additionalMedia: [
        'https://s.coze.cn/image/8O5tLBWgw-g/',
        'https://s.coze.cn/image/pH-CaDQzo98/'
      ]
    },
    'portfolio-2': {
      title: '金融科技企业官网',
      category: '网页设计',
      date: '2023.12',
      views: '856',
      description: '为金融科技公司设计的现代化企业官网，突出技术创新和专业服务。网站采用了模块化设计，支持多端适配，为用户提供流畅的浏览体验。',
      mediaType: 'image',
      mainMedia: 'https://s.coze.cn/image/BVHM-Z7diNg/',
      mediaAlt: '金融科技企业官网首页',
      additionalMedia: [
        'https://s.coze.cn/image/pb_mL7YRpSI/',
        'https://s.coze.cn/image/B2A301kiq_A/'
      ]
    },
    'portfolio-3': {
      title: '智能购物平台',
      category: 'UX设计',
      date: '2023.11',
      views: '2.1k',
      description: '基于AI推荐的个性化购物平台，优化用户购物体验和转化率。平台采用了先进的推荐算法，为每位用户提供个性化的商品推荐。',
      mediaType: 'image',
      mainMedia: 'https://s.coze.cn/image/-bU40YZLlUQ/',
      mediaAlt: '智能购物平台界面',
      additionalMedia: [
        'https://s.coze.cn/image/SajSYCTOZIQ/',
        'https://s.coze.cn/image/za_I3ISRF0E/'
      ]
    },
    'portfolio-4': {
      title: '在线教育APP',
      category: 'UI设计',
      date: '2023.10',
      views: '1.5k',
      description: '面向K12学生的在线学习平台，包含课程学习、作业提交、师生互动等功能。应用采用了游戏化学习设计，提高学生的学习兴趣和参与度。',
      mediaType: 'image',
      mainMedia: 'https://s.coze.cn/image/qZm7ErlyIf0/',
      mediaAlt: '在线教育APP主界面',
      additionalMedia: [
        'https://s.coze.cn/image/C8TOVoNOeE8/',
        'https://s.coze.cn/image/lLTvVx6LWA4/'
      ]
    },
    'portfolio-5': {
      title: '数据可视化平台',
      category: '网页设计',
      date: '2023.09',
      views: '945',
      description: '企业级数据分析和可视化平台，帮助企业快速洞察业务数据。平台支持多种图表类型和数据导出功能，为决策提供数据支持。',
      mediaType: 'image',
      mainMedia: 'https://s.coze.cn/image/S3j4ANkHVr4/',
      mediaAlt: '数据可视化平台界面',
      additionalMedia: [
        'https://s.coze.cn/image/2rIhSBw2ofc/',
        'https://s.coze.cn/image/Ho1_HDcK2oM/'
      ]
    },
    'portfolio-6': {
      title: '兴趣社交APP',
      category: 'UX设计',
      date: '2023.08',
      views: '1.8k',
      description: '基于兴趣爱好的社交平台，让用户找到志同道合的朋友。应用采用了独特的兴趣匹配算法，帮助用户快速找到兴趣相投的伙伴。',
      mediaType: 'image',
      mainMedia: 'https://s.coze.cn/image/UUQPTlXT8eg/',
      mediaAlt: '兴趣社交APP界面',
      additionalMedia: [
        'https://s.coze.cn/image/H2bpYwTllnI/',
        'https://s.coze.cn/image/VEvFY1pgsTk/'
      ]
    }
  };

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    const portfolioId = searchParams.get('portfolioId') || 'portfolio-1';
    const data = portfolioData[portfolioId];
    document.title = data ? `${data.title} - 扉页智汇` : '作品详情 - 扉页智汇';
    return () => {
      document.title = originalTitle;
    };
  }, [searchParams, portfolioData]);

  // 加载作品数据
  useEffect(() => {
    const portfolioId = searchParams.get('portfolioId') || 'portfolio-1';
    const data = portfolioData[portfolioId];
    
    if (data) {
      setCurrentPortfolioData(data);
      
      // 加载相关作品
      const related = Object.values(portfolioData).filter(item => item.title !== data.title).slice(0, 3);
      setRelatedPortfolios(related);
    }
  }, [searchParams, portfolioData]);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleSearchInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const searchTerm = (e.target as HTMLInputElement).value;
      navigate(`/home?search=${encodeURIComponent(searchTerm)}#portfolio`);
    }
  };

  const handleChatToggleClick = () => {
    setIsChatWindowOpen(!isChatWindowOpen);
  };

  const handleChatCloseClick = () => {
    setIsChatWindowOpen(false);
  };

  const handleRelatedPortfolioClick = (portfolioId: string) => {
    navigate(`/portfolio-detail?portfolioId=${portfolioId}`);
  };

  const handleDownloadDocumentClick = () => {
    console.log('下载文档功能需要实际文件存储支持');
  };

  const getCategoryStyle = (category: string) => {
    if (category === 'UI设计') {
      return 'bg-primary text-white';
    } else if (category === 'UX设计') {
      return 'bg-accent text-white';
    } else if (category === '网页设计') {
      return 'bg-secondary text-white';
    }
    return 'bg-primary text-white';
  };

  if (!currentPortfolioData) {
    return <div className="flex items-center justify-center min-h-screen">加载中...</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 bg-cardBg shadow-soft z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo和产品名称 */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient rounded-lg flex items-center justify-center">
                <i className="fas fa-book-open text-white text-sm"></i>
              </div>
              <span className={`text-xl font-bold ${styles.textGradient}`}>扉页智汇</span>
            </div>
            
            {/* 主导航菜单 */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/home#home" className="text-textSecondary hover:text-primary px-3 py-2 text-sm font-medium transition-colors">首页</Link>
              <Link to="/home#about" className="text-textSecondary hover:text-primary px-3 py-2 text-sm font-medium transition-colors">关于我</Link>
              <Link to="/home#portfolio" className={`${styles.navLinkActive} px-3 py-2 text-sm font-medium transition-colors`}>作品集</Link>
              <Link to="/home#contact" className="text-textSecondary hover:text-primary px-3 py-2 text-sm font-medium transition-colors">联系方式</Link>
            </nav>
            
            {/* 搜索框和聊天按钮 */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:block relative">
                <input 
                  type="text" 
                  placeholder="搜索作品..." 
                  className={`w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl ${styles.searchInput} bg-gray-50 text-sm`}
                  onKeyPress={handleSearchInputKeyPress}
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted text-sm"></i>
              </div>
              <button className={`${styles.chatButton} w-10 h-10 bg-primary text-white rounded-full shadow-card flex items-center justify-center`}>
                <i className="fas fa-comments text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="pt-16">
        {/* 页面头部 */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleBackButtonClick}
                  className="w-10 h-10 bg-white text-textSecondary rounded-lg shadow-card hover:shadow-card-hover transition-all flex items-center justify-center"
                >
                  <i className="fas fa-arrow-left text-sm"></i>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-textPrimary">作品详情</h1>
                  <nav className="text-sm text-textMuted mt-1">
                    <Link to="/home" className="hover:text-primary">首页</Link>
                    <span className="mx-2">/</span>
                    <Link to="/home#portfolio" className="hover:text-primary">作品集</Link>
                    <span className="mx-2">/</span>
                    <span>{currentPortfolioData.title}</span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 作品详情内容 */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 作品基本信息 */}
            <div className="bg-cardBg rounded-2xl shadow-card p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-textPrimary mb-4">{currentPortfolioData.title}</h2>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-textSecondary mb-6">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-tag text-primary"></i>
                    <span>{currentPortfolioData.category}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-calendar text-primary"></i>
                    <span>{currentPortfolioData.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-eye text-primary"></i>
                    <span>{currentPortfolioData.views} 次浏览</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 作品媒体内容 */}
            <div className="bg-cardBg rounded-2xl shadow-card p-8 mb-8">
              <h3 className="text-xl font-semibold text-textPrimary mb-6">作品展示</h3>
              
              {/* 图片展示 */}
              {currentPortfolioData.mediaType === 'image' && (
                <div className="space-y-6">
                  <div className={`${styles.portfolioImage} overflow-hidden rounded-xl`}>
                    <img 
                      src={currentPortfolioData.mainMedia}
                      alt={currentPortfolioData.mediaAlt}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  
                  {currentPortfolioData.additionalMedia && (
                    <div className="grid md:grid-cols-2 gap-4">
                      {currentPortfolioData.additionalMedia.slice(0, 2).map((media, index) => (
                        <div key={index} className={`${styles.portfolioImage} overflow-hidden rounded-xl`}>
                          <img 
                            src={media}
                            alt={`${currentPortfolioData.mediaAlt} ${index + 1}`}
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 视频播放器 */}
              {currentPortfolioData.mediaType === 'video' && (
                <div className={styles.videoContainer}>
                  <video controls poster="https://s.coze.cn/image/ohJ9-8fG93U/">
                    <source src={currentPortfolioData.mainMedia} type="video/mp4" />
                    您的浏览器不支持视频播放。
                  </video>
                </div>
              )}

              {/* 文档预览 */}
              {currentPortfolioData.mediaType === 'document' && (
                <div className={styles.documentPreview}>
                  <i className="fas fa-file-pdf text-6xl text-red-500 mb-4"></i>
                  <h4 className="text-lg font-semibold text-textPrimary mb-2">设计文档</h4>
                  <p className="text-textSecondary mb-4">点击下方按钮查看完整文档</p>
                  <button 
                    onClick={handleDownloadDocumentClick}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    <i className="fas fa-download mr-2"></i>
                    下载文档
                  </button>
                </div>
              )}
            </div>

            {/* 作品描述 */}
            <div className="bg-cardBg rounded-2xl shadow-card p-8 mb-8">
              <h3 className="text-xl font-semibold text-textPrimary mb-6">项目介绍</h3>
              <div className="prose prose-lg max-w-none text-textSecondary leading-relaxed">
                <p className="mb-6">
                  这是一款专注于用户健康数据管理的移动应用，旨在帮助用户更好地了解和管理自己的健康状况。
                  应用集成了多种健康监测功能，为用户提供全方位的健康管理解决方案。
                </p>
                
                <h4 className="text-lg font-semibold text-textPrimary mb-3">核心功能</h4>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li>步数统计与运动轨迹记录</li>
                  <li>饮食记录与营养分析</li>
                  <li>睡眠质量监测与分析</li>
                  <li>心率、血压等生理指标记录</li>
                  <li>健康报告生成与趋势分析</li>
                  <li>个性化健康建议推送</li>
                </ul>
                
                <h4 className="text-lg font-semibold text-textPrimary mb-3">设计理念</h4>
                <p className="mb-6">
                  设计采用了清新自然的配色方案，以蓝色和绿色为主色调，传达健康、专业的品牌形象。
                  界面布局简洁明了，重点突出核心功能，让用户能够快速找到所需的健康管理工具。
                </p>
                
                <h4 className="text-lg font-semibold text-textPrimary mb-3">技术栈</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <span className="px-3 py-1 bg-tertiary text-primary rounded-full text-sm">Figma</span>
                  <span className="px-3 py-1 bg-tertiary text-primary rounded-full text-sm">Sketch</span>
                  <span className="px-3 py-1 bg-tertiary text-primary rounded-full text-sm">Principle</span>
                  <span className="px-3 py-1 bg-tertiary text-primary rounded-full text-sm">Framer</span>
                </div>
                
                <h4 className="text-lg font-semibold text-textPrimary mb-3">项目成果</h4>
                <p>
                  该应用上线后获得了用户的广泛好评，在应用商店健康类应用中排名前50，
                  累计下载量超过10万次，用户满意度达到4.8分（满分5分）。
                </p>
              </div>
            </div>

            {/* 相关作品推荐 */}
            <div className="bg-cardBg rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-semibold text-textPrimary mb-6">相关作品</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPortfolios.map((portfolio, index) => {
                  const portfolioId = Object.keys(portfolioData).find(key => portfolioData[key].title === portfolio.title);
                  return (
                    <div 
                      key={index}
                      onClick={() => portfolioId && handleRelatedPortfolioClick(portfolioId)}
                      className="bg-gray-50 rounded-xl overflow-hidden cursor-pointer hover:shadow-card transition-all"
                    >
                      <div className="relative">
                        <img 
                          src={portfolio.mainMedia}
                          alt={portfolio.mediaAlt}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryStyle(portfolio.category)}`}>
                            {portfolio.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-textPrimary mb-1">{portfolio.title}</h4>
                        <p className="text-sm text-textSecondary">
                          {portfolio.category === 'UI设计' ? '用户界面设计' : 
                           portfolio.category === 'UX设计' ? '用户体验设计' : '网站设计'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 智能机器人聊天界面 */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* 聊天按钮 */}
        <button 
          onClick={handleChatToggleClick}
          className={`${styles.chatButton} w-14 h-14 bg-primary text-white rounded-full shadow-card flex items-center justify-center`}
        >
          <i className={`fas ${isChatWindowOpen ? 'fa-times' : 'fa-comments'} text-lg`}></i>
        </button>
        
        {/* 聊天窗口 */}
        {isChatWindowOpen && (
          <div className="w-80 bg-cardBg rounded-2xl shadow-card overflow-hidden">
            {/* 聊天头部 */}
            <div className={`${styles.gradientBg} text-white p-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <i className="fas fa-robot text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">智能助手</h3>
                    <p className="text-xs opacity-90">在线为您服务</p>
                  </div>
                </div>
                <button 
                  onClick={handleChatCloseClick}
                  className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
              </div>
            </div>
            
            {/* 聊天内容 */}
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {/* 机器人消息 */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-robot text-white text-xs"></i>
                </div>
                <div className="bg-gray-100 rounded-xl px-4 py-3 max-w-xs">
                  <p className="text-sm text-textPrimary">您好！我是张小明的智能助手，有什么可以帮助您的吗？</p>
                </div>
              </div>
              
              {/* 预设问题 */}
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 bg-tertiary text-primary rounded-xl text-sm hover:bg-primary hover:text-white transition-colors">
                  了解张小明的工作经历
                </button>
                <button className="w-full text-left px-4 py-3 bg-tertiary text-primary rounded-xl text-sm hover:bg-primary hover:text-white transition-colors">
                  查看作品集
                </button>
                <button className="w-full text-left px-4 py-3 bg-tertiary text-primary rounded-xl text-sm hover:bg-primary hover:text-white transition-colors">
                  联系合作
                </button>
              </div>
            </div>
            
            {/* 聊天输入 */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex space-x-3">
                <input 
                  type="text" 
                  placeholder="输入您的问题..." 
                  className={`flex-1 px-4 py-3 border border-gray-200 rounded-xl ${styles.searchInput} text-sm`}
                />
                <button className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center">
                  <i className="fas fa-paper-plane text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 页脚 */}
      <footer className="bg-textPrimary text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-4">
            <div className="flex justify-center space-x-6">
              <a href="#" className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
                <i className="fab fa-github text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
                <i className="fab fa-linkedin text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
                <i className="fab fa-weixin text-lg"></i>
              </a>
            </div>
            <p className="text-sm opacity-80">© 2024 扉页智汇. 保留所有权利.</p>
            <p className="text-xs opacity-60">使用扉页智汇构建您的个人品牌</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioDetailPage;

