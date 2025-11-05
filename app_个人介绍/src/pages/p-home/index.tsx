

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  views: string;
  date: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [chatInput, setChatInput] = useState('');

  const portfolioItems: PortfolioItem[] = [
    {
      id: 'portfolio-1',
      title: '健康管理APP',
      description: '一款专注于用户健康数据管理的移动应用，包含步数统计、饮食记录、睡眠监测等功能。',
      category: 'UI设计',
      image: 'https://s.coze.cn/image/1ghioLYaVY0/',
      views: '1.2k 次浏览',
      date: '2024.01'
    },
    {
      id: 'portfolio-2',
      title: '金融科技企业官网',
      description: '为金融科技公司设计的现代化企业官网，突出技术创新和专业服务。',
      category: '网页设计',
      image: 'https://s.coze.cn/image/1fU0KJvI8l4/',
      views: '856 次浏览',
      date: '2023.12'
    },
    {
      id: 'portfolio-3',
      title: '智能购物平台',
      description: '基于AI推荐的个性化购物平台，优化用户购物体验和转化率。',
      category: 'UX设计',
      image: 'https://s.coze.cn/image/jgJbtLZVybU/',
      views: '2.1k 次浏览',
      date: '2023.11'
    },
    {
      id: 'portfolio-4',
      title: '在线教育APP',
      description: '面向K12学生的在线学习平台，包含课程学习、作业提交、师生互动等功能。',
      category: 'UI设计',
      image: 'https://s.coze.cn/image/AOpcg3SxeA8/',
      views: '1.5k 次浏览',
      date: '2023.10'
    },
    {
      id: 'portfolio-5',
      title: '数据可视化平台',
      description: '企业级数据分析和可视化平台，帮助企业快速洞察业务数据。',
      category: '网页设计',
      image: 'https://s.coze.cn/image/E6PdHJ-zntE/',
      views: '945 次浏览',
      date: '2023.09'
    },
    {
      id: 'portfolio-6',
      title: '兴趣社交APP',
      description: '基于兴趣爱好的社交平台，让用户找到志同道合的朋友。',
      category: 'UX设计',
      image: 'https://s.coze.cn/image/eqYlEYJfYC0/',
      views: '1.8k 次浏览',
      date: '2023.08'
    }
  ];

  const filteredPortfolioItems = portfolioItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'ui' && item.category === 'UI设计') ||
                         (activeFilter === 'ux' && item.category === 'UX设计') ||
                         (activeFilter === 'web' && item.category === '网页设计');
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '扉页智汇 - 个人主页';
    return () => { document.title = originalTitle; };
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handlePortfolioItemClick = (portfolioId: string) => {
    navigate(`/portfolio-detail?portfolioId=${portfolioId}`);
  };

  const handleChatToggle = () => {
    setIsChatWindowOpen(!isChatWindowOpen);
  };

  const handleChatClose = () => {
    setIsChatWindowOpen(false);
  };

  const handleFaqClick = (action: string) => {
    if (action === 'work-experience') {
      console.log('用户询问工作经历，需要调用机器人API回答');
    } else if (action === 'portfolio') {
      handleScrollToSection('portfolio-section');
      setIsChatWindowOpen(false);
    } else if (action === 'cooperation') {
      handleScrollToSection('contact-section');
      setIsChatWindowOpen(false);
    }
  };

  const handleChatSend = () => {
    const message = chatInput.trim();
    if (message) {
      console.log('用户发送消息：', message);
      setChatInput('');
    }
  };

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = contactFormData;
    
    if (!name || !email || !message) {
      alert('请填写完整的联系信息');
      return;
    }
    
    console.log('联系表单提交：', { name, email, message });
    alert('消息发送成功！我会尽快回复您。');
    setContactFormData({ name: '', email: '', message: '' });
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'UI设计':
        return 'bg-primary';
      case 'UX设计':
        return 'bg-accent';
      case '网页设计':
        return 'bg-secondary';
      default:
        return 'bg-primary';
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 顶部导航栏 */}
      <header id="main-header" className="fixed top-0 left-0 right-0 bg-cardBg shadow-soft z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo和产品名称 */}
            <div id="header-logo" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient rounded-lg flex items-center justify-center">
                <i className="fas fa-book-open text-white text-sm"></i>
              </div>
              <span className={`text-xl font-bold ${styles.textGradient}`}>扉页智汇</span>
            </div>
            
            {/* 主导航菜单 */}
            <nav id="main-nav" className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => handleScrollToSection('hero-section')}
                className={`${styles.navLinkActive} px-3 py-2 text-sm font-medium transition-colors`}
              >
                首页
              </button>
              <button 
                onClick={() => handleScrollToSection('about-section')}
                className="text-textSecondary hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                关于我
              </button>
              <button 
                onClick={() => handleScrollToSection('portfolio-section')}
                className="text-textSecondary hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                作品集
              </button>
              <button 
                onClick={() => handleScrollToSection('contact-section')}
                className="text-textSecondary hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                联系方式
              </button>
            </nav>
            
            {/* 搜索框和聊天按钮 */}
            <div id="header-actions" className="flex items-center space-x-4">
              <div className="hidden lg:block relative">
                <input 
                  type="text" 
                  placeholder="搜索作品..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl ${styles.searchInput} bg-gray-50 text-sm`}
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted text-sm"></i>
              </div>
              <button 
                onClick={handleChatToggle}
                className={`${styles.chatButton} w-10 h-10 bg-primary text-white rounded-full shadow-card flex items-center justify-center`}
              >
                <i className="fas fa-comments text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区域 */}
      <main id="main-content" className="pt-16">
        {/* 页面头部 - 个人介绍区 */}
        <section id="hero-section" className="py-20 bg-gradient-to-br from-background to-tertiary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div id="hero-content" className="space-y-8">
              {/* 个人头像 */}
              <div id="hero-avatar" className="relative inline-block">
                <img 
                  src="https://s.coze.cn/image/EG7xg8Zhv8I/" 
                  alt="个人头像" 
                  data-category="人物" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-card"
                />
                <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-card">
                  <i className="fas fa-check text-white text-sm"></i>
                </div>
              </div>
              
              {/* 个人信息 */}
              <div id="hero-info" className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-textPrimary">张小明</h1>
                <p className="text-xl text-primary font-medium">UI/UX设计师 & 前端开发者</p>
                <div className="flex justify-center space-x-4 text-sm text-textSecondary">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>北京·朝阳区</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-briefcase"></i>
                    <span>5年工作经验</span>
                  </span>
                </div>
              </div>
              
              {/* 简短介绍 */}
              <div id="hero-description" className="max-w-2xl mx-auto">
                <p className="text-lg text-textSecondary leading-relaxed">
                  专注于用户体验设计和前端开发，致力于创造美观、易用的数字产品。
                  热爱设计，追求细节，相信好的设计能够改变世界。
                </p>
              </div>
              
              {/* 快速操作按钮 */}
              <div id="hero-actions" className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => handleScrollToSection('portfolio-section')}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-medium shadow-card hover:shadow-card-hover transition-all"
                >
                  <i className="fas fa-folder-open mr-2"></i>
                  查看作品集
                </button>
                <button 
                  onClick={() => handleScrollToSection('contact-section')}
                  className="px-8 py-3 bg-white text-primary border-2 border-primary rounded-xl font-medium shadow-card hover:shadow-card-hover transition-all"
                >
                  <i className="fas fa-envelope mr-2"></i>
                  联系我
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 个人简介区 */}
        <section id="about-section" className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div id="about-content" className="bg-cardBg rounded-2xl shadow-card p-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-textPrimary mb-4">关于我</h2>
                <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* 个人照片 */}
                <div id="about-image" className="relative">
                  <img 
                    src="https://s.coze.cn/image/PrX3jGR_5_c/" 
                    alt="个人工作照" 
                    data-category="人物" 
                    className="w-full h-auto rounded-xl object-cover shadow-card"
                  />
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-tertiary rounded-xl flex items-center justify-center">
                    <i className="fas fa-palette text-primary text-2xl"></i>
                  </div>
                </div>
                
                {/* 个人介绍文本 */}
                <div id="about-text" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-textPrimary mb-3">教育背景</h3>
                    <div className="space-y-2 text-textSecondary">
                      <p className="flex items-center space-x-2">
                        <i className="fas fa-graduation-cap text-primary"></i>
                        <span>清华大学 设计学硕士</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <i className="fas fa-calendar text-primary"></i>
                        <span>2016.09 - 2019.06</span>
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-textPrimary mb-3">工作经历</h3>
                    <div className="space-y-3 text-textSecondary">
                      <div>
                        <p className="font-medium">高级UI设计师 @ 字节跳动</p>
                        <p className="text-sm">2020.03 - 至今</p>
                      </div>
                      <div>
                        <p className="font-medium">UI设计师 @ 腾讯</p>
                        <p className="text-sm">2019.07 - 2020.02</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-textPrimary mb-3">技能特长</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-tertiary text-primary rounded-full text-sm">Figma</span>
                      <span className="px-3 py-1 bg-tertiary text-primary rounded-full text-sm">Sketch</span>
                      <span className="px-3 py-1 bg-tertiary text-primary rounded-full text-sm">Photoshop</span>
                      <span className="px-3 py-1 bg-tertiary text-primary rounded-full text-sm">HTML/CSS</span>
                      <span className="px-3 py-1 bg-tertiary text-primary rounded-full text-sm">JavaScript</span>
                      <span className="px-3 py-1 bg-tertiary text-primary rounded-full text-sm">React</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 作品集展示区 */}
        <section id="portfolio-section" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-textPrimary mb-4">我的作品</h2>
              <p className="text-lg text-textSecondary max-w-2xl mx-auto">
                精选的设计作品和项目案例，展示我的设计理念和技术能力
              </p>
              <div className="w-20 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
            </div>
            
            {/* 作品类别筛选 */}
            <div id="portfolio-filter" className="flex justify-center space-x-4 mb-8">
              <button 
                onClick={() => handleFilterClick('all')}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  activeFilter === 'all' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-textSecondary hover:bg-primary hover:text-white transition-colors'
                }`}
              >
                全部作品
              </button>
              <button 
                onClick={() => handleFilterClick('ui')}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  activeFilter === 'ui' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-textSecondary hover:bg-primary hover:text-white transition-colors'
                }`}
              >
                UI设计
              </button>
              <button 
                onClick={() => handleFilterClick('ux')}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  activeFilter === 'ux' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-textSecondary hover:bg-primary hover:text-white transition-colors'
                }`}
              >
                UX设计
              </button>
              <button 
                onClick={() => handleFilterClick('web')}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  activeFilter === 'web' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-textSecondary hover:bg-primary hover:text-white transition-colors'
                }`}
              >
                网页设计
              </button>
            </div>
            
            {/* 作品网格 */}
            <div id="portfolio-grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPortfolioItems.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handlePortfolioItemClick(item.id)}
                  className={`${styles.portfolioCard} bg-cardBg rounded-2xl shadow-card overflow-hidden cursor-pointer`}
                >
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      data-category="商业科技" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 ${getCategoryBadgeClass(item.category)} text-white rounded-full text-xs font-medium`}>
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all flex items-center justify-center">
                      <i className="fas fa-external-link-alt text-white text-2xl opacity-0 hover:opacity-100 transition-opacity"></i>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-textPrimary mb-2">{item.title}</h3>
                    <p className="text-textSecondary text-sm mb-4">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-textMuted">
                      <span className="flex items-center space-x-1">
                        <i className="fas fa-eye"></i>
                        <span>{item.views}</span>
                      </span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 查看更多按钮 */}
            <div className="text-center mt-12">
              <button 
                onClick={() => console.log('查看更多作品功能')}
                className="px-8 py-3 bg-white text-primary border-2 border-primary rounded-xl font-medium shadow-card hover:shadow-card-hover transition-all"
              >
                <i className="fas fa-arrow-down mr-2"></i>
                查看更多作品
              </button>
            </div>
          </div>
        </section>

        {/* 联系方式区 */}
        <section id="contact-section" className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-textPrimary mb-4">联系我</h2>
              <p className="text-lg text-textSecondary max-w-2xl mx-auto">
                有项目合作或其他问题？欢迎通过以下方式联系我
              </p>
              <div className="w-20 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
            </div>
            
            <div id="contact-content" className="bg-cardBg rounded-2xl shadow-card p-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* 联系方式列表 */}
                <div id="contact-info" className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                      <i className="fas fa-envelope text-white"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-textPrimary">邮箱</h3>
                      <p className="text-textSecondary">zhangxiaoming@example.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                      <i className="fab fa-weixin text-white"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-textPrimary">微信</h3>
                      <p className="text-textSecondary">zhangxm_design</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                      <i className="fab fa-github text-white"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-textPrimary">GitHub</h3>
                      <p className="text-textSecondary">github.com/zhangxm</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                      <i className="fab fa-linkedin text-white"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-textPrimary">LinkedIn</h3>
                      <p className="text-textSecondary">linkedin.com/in/zhangxm</p>
                    </div>
                  </div>
                </div>
                
                {/* 联系表单 */}
                <div id="contact-form" className="space-y-6">
                  <form onSubmit={handleContactFormSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-textPrimary mb-2">姓名</label>
                      <input 
                        type="text" 
                        id="contact-name" 
                        name="name" 
                        value={contactFormData.name}
                        onChange={handleContactFormChange}
                        className={`w-full px-4 py-3 border border-gray-200 rounded-xl ${styles.searchInput}`}
                        placeholder="请输入您的姓名"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-textPrimary mb-2">邮箱</label>
                      <input 
                        type="email" 
                        id="contact-email" 
                        name="email" 
                        value={contactFormData.email}
                        onChange={handleContactFormChange}
                        className={`w-full px-4 py-3 border border-gray-200 rounded-xl ${styles.searchInput}`}
                        placeholder="请输入您的邮箱"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-medium text-textPrimary mb-2">留言</label>
                      <textarea 
                        id="contact-message" 
                        name="message" 
                        rows={4}
                        value={contactFormData.message}
                        onChange={handleContactFormChange}
                        className={`w-full px-4 py-3 border border-gray-200 rounded-xl ${styles.searchInput} resize-none`}
                        placeholder="请输入您的留言内容"
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full py-3 bg-primary text-white rounded-xl font-medium shadow-card hover:shadow-card-hover transition-all"
                    >
                      <i className="fas fa-paper-plane mr-2"></i>
                      发送消息
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 智能机器人聊天界面 */}
      <div id="chat-widget" className="fixed bottom-6 right-6 z-50">
        {/* 聊天按钮 */}
        <button 
          onClick={handleChatToggle}
          className={`${styles.chatButton} w-14 h-14 bg-primary text-white rounded-full shadow-card flex items-center justify-center`}
        >
          <i className={`fas ${isChatWindowOpen ? 'fa-times' : 'fa-comments'} text-lg`}></i>
        </button>
        
        {/* 聊天窗口 */}
        {isChatWindowOpen && (
          <div id="chat-window" className="w-80 bg-cardBg rounded-2xl shadow-card overflow-hidden">
            {/* 聊天头部 */}
            <div id="chat-header" className={`${styles.gradientBg} text-white p-4`}>
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
                  onClick={handleChatClose}
                  className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
              </div>
            </div>
            
            {/* 聊天内容 */}
            <div id="chat-content" className="p-4 space-y-4 max-h-96 overflow-y-auto">
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
                <button 
                  onClick={() => handleFaqClick('work-experience')}
                  className="w-full text-left px-4 py-3 bg-tertiary text-primary rounded-xl text-sm hover:bg-primary hover:text-white transition-colors"
                >
                  了解张小明的工作经历
                </button>
                <button 
                  onClick={() => handleFaqClick('portfolio')}
                  className="w-full text-left px-4 py-3 bg-tertiary text-primary rounded-xl text-sm hover:bg-primary hover:text-white transition-colors"
                >
                  查看作品集
                </button>
                <button 
                  onClick={() => handleFaqClick('cooperation')}
                  className="w-full text-left px-4 py-3 bg-tertiary text-primary rounded-xl text-sm hover:bg-primary hover:text-white transition-colors"
                >
                  联系合作
                </button>
              </div>
            </div>
            
            {/* 聊天输入 */}
            <div id="chat-input-area" className="p-4 border-t border-gray-100">
              <div className="flex space-x-3">
                <input 
                  type="text" 
                  placeholder="输入您的问题..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                  className={`flex-1 px-4 py-3 border border-gray-200 rounded-xl ${styles.searchInput} text-sm`}
                />
                <button 
                  onClick={handleChatSend}
                  className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center"
                >
                  <i className="fas fa-paper-plane text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 页脚 */}
      <footer id="main-footer" className="bg-textPrimary text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-4">
            <div className="flex justify-center space-x-6">
              <a 
                href="https://github.com/zhangxm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
              >
                <i className="fab fa-github text-lg"></i>
              </a>
              <a 
                href="https://linkedin.com/in/zhangxm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
              >
                <i className="fab fa-linkedin text-lg"></i>
              </a>
              <button 
                onClick={() => alert('微信号：zhangxm_design')}
                className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
              >
                <i className="fab fa-weixin text-lg"></i>
              </button>
            </div>
            <p className="text-sm opacity-80">© 2024 扉页智汇. 保留所有权利.</p>
            <p className="text-xs opacity-60">使用扉页智汇构建您的个人品牌</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

