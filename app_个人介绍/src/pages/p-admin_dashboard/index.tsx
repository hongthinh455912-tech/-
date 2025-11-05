

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const AdminDashboard: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '后台管理首页 - 扉页智汇';
    return () => { document.title = originalTitle; };
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      navigate('/admin-login');
    }
  };

  const handleQuickAction = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 bg-cardBg shadow-soft z-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo和产品名称 */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleSidebarToggle}
                className="w-8 h-8 flex items-center justify-center text-textSecondary hover:text-primary transition-colors"
              >
                <i className="fas fa-bars text-sm"></i>
              </button>
              <div className="w-8 h-8 bg-gradient rounded-lg flex items-center justify-center">
                <i className="fas fa-book-open text-white text-sm"></i>
              </div>
              <span className="text-xl font-bold text-primary">扉页智汇</span>
            </div>
            
            {/* 面包屑导航 */}
            <nav className="hidden md:flex items-center space-x-2 text-sm text-textSecondary">
              <span>首页</span>
              <i className="fas fa-chevron-right text-xs"></i>
              <span className="text-primary">后台管理</span>
            </nav>
            
            {/* 管理员信息和退出登录 */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://s.coze.cn/image/-Z28qGgS0n4/" 
                  alt="管理员头像" 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-textPrimary">张小明</p>
                  <p className="text-xs text-textSecondary">管理员</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-8 h-8 flex items-center justify-center text-textSecondary hover:text-red-500 transition-colors"
              >
                <i className="fas fa-sign-out-alt text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 左侧菜单 */}
      <aside className={`fixed left-0 top-16 bottom-0 bg-cardBg shadow-soft z-40 transition-all duration-300 ${
        isSidebarCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded
      }`}>
        <nav className="p-4 space-y-2">
          <Link 
            to="/admin-dashboard" 
            className={`${styles.navLinkActive} flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all`}
          >
            <i className="fas fa-tachometer-alt w-5"></i>
            {!isSidebarCollapsed && <span>控制台</span>}
          </Link>
          <Link 
            to="/admin-profile" 
            className={`${styles.navLinkHover} flex items-center space-x-3 px-4 py-3 text-sm font-medium text-textSecondary transition-all`}
          >
            <i className="fas fa-user w-5"></i>
            {!isSidebarCollapsed && <span>个人信息</span>}
          </Link>
          <Link 
            to="/admin-portfolio" 
            className={`${styles.navLinkHover} flex items-center space-x-3 px-4 py-3 text-sm font-medium text-textSecondary transition-all`}
          >
            <i className="fas fa-folder-open w-5"></i>
            {!isSidebarCollapsed && <span>作品集管理</span>}
          </Link>
          <Link 
            to="/admin-contact" 
            className={`${styles.navLinkHover} flex items-center space-x-3 px-4 py-3 text-sm font-medium text-textSecondary transition-all`}
          >
            <i className="fas fa-address-book w-5"></i>
            {!isSidebarCollapsed && <span>联系方式管理</span>}
          </Link>
          <Link 
            to="/admin-bot-settings" 
            className={`${styles.navLinkHover} flex items-center space-x-3 px-4 py-3 text-sm font-medium text-textSecondary transition-all`}
          >
            <i className="fas fa-robot w-5"></i>
            {!isSidebarCollapsed && <span>机器人设置</span>}
          </Link>
          <Link 
            to="/admin-stats" 
            className={`${styles.navLinkHover} flex items-center space-x-3 px-4 py-3 text-sm font-medium text-textSecondary transition-all`}
          >
            <i className="fas fa-chart-bar w-5"></i>
            {!isSidebarCollapsed && <span>数据统计</span>}
          </Link>
          <Link 
            to="/admin-page-settings" 
            className={`${styles.navLinkHover} flex items-center space-x-3 px-4 py-3 text-sm font-medium text-textSecondary transition-all`}
          >
            <i className="fas fa-palette w-5"></i>
            {!isSidebarCollapsed && <span>页面设置</span>}
          </Link>
        </nav>
      </aside>

      {/* 主内容区域 */}
      <main className={`mt-16 p-6 transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-14' : 'ml-60'
      }`}>
        {/* 页面头部 */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-textPrimary mb-2">欢迎回来，张小明</h1>
              <p className="text-textSecondary">今天是 2024年1月15日，让我们查看您的最新数据</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-textSecondary">最后登录</p>
              <p className="text-sm font-medium text-textPrimary">2024-01-14 18:30</p>
            </div>
          </div>
        </div>

        {/* 数据概览区 */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 总访问量 */}
            <div className={`${styles.statCard} bg-cardBg rounded-2xl shadow-card p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-textSecondary mb-1">总访问量</p>
                  <p className="text-3xl font-bold text-textPrimary">12,586</p>
                  <p className="text-sm text-green-600 mt-1">
                    <i className="fas fa-arrow-up mr-1"></i>
                    +12.5% 较上月
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-eye text-primary text-xl"></i>
                </div>
              </div>
            </div>

            {/* 今日访问量 */}
            <div className={`${styles.statCard} bg-cardBg rounded-2xl shadow-card p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-textSecondary mb-1">今日访问量</p>
                  <p className="text-3xl font-bold text-textPrimary">156</p>
                  <p className="text-sm text-green-600 mt-1">
                    <i className="fas fa-arrow-up mr-1"></i>
                    +8.2% 较昨日
                  </p>
                </div>
                <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-calendar-day text-secondary text-xl"></i>
                </div>
              </div>
            </div>

            {/* 作品总数 */}
            <div className={`${styles.statCard} bg-cardBg rounded-2xl shadow-card p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-textSecondary mb-1">作品总数</p>
                  <p className="text-3xl font-bold text-textPrimary">24</p>
                  <p className="text-sm text-blue-600 mt-1">
                    <i className="fas fa-plus mr-1"></i>
                    本月新增 3 个
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-folder-open text-accent text-xl"></i>
                </div>
              </div>
            </div>

            {/* 机器人对话数 */}
            <div className={`${styles.statCard} bg-cardBg rounded-2xl shadow-card p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-textSecondary mb-1">机器人对话数</p>
                  <p className="text-3xl font-bold text-textPrimary">89</p>
                  <p className="text-sm text-purple-600 mt-1">
                    <i className="fas fa-comments mr-1"></i>
                    本周新增 12 次
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500 bg-opacity-10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-robot text-purple-500 text-xl"></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 快捷操作区 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-textPrimary mb-6">快捷操作</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 编辑个人信息 */}
            <div 
              onClick={() => handleQuickAction('/admin-profile')}
              className="bg-cardBg rounded-2xl shadow-card p-6 cursor-pointer hover:shadow-card-hover transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-user-edit text-primary text-xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-textPrimary mb-1">编辑个人信息</h3>
                  <p className="text-sm text-textSecondary">更新您的个人资料和简介</p>
                </div>
                <i className="fas fa-arrow-right text-textMuted"></i>
              </div>
            </div>

            {/* 添加新作品 */}
            <div 
              onClick={() => handleQuickAction('/admin-portfolio')}
              className="bg-cardBg rounded-2xl shadow-card p-6 cursor-pointer hover:shadow-card-hover transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-plus-circle text-secondary text-xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-textPrimary mb-1">添加新作品</h3>
                  <p className="text-sm text-textSecondary">上传和管理您的作品集</p>
                </div>
                <i className="fas fa-arrow-right text-textMuted"></i>
              </div>
            </div>

            {/* 设置机器人 */}
            <div 
              onClick={() => handleQuickAction('/admin-bot-settings')}
              className="bg-cardBg rounded-2xl shadow-card p-6 cursor-pointer hover:shadow-card-hover transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500 bg-opacity-10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-cog text-purple-500 text-xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-textPrimary mb-1">设置机器人</h3>
                  <p className="text-sm text-textSecondary">配置智能助手的问答内容</p>
                </div>
                <i className="fas fa-arrow-right text-textMuted"></i>
              </div>
            </div>

            {/* 查看统计报告 */}
            <div 
              onClick={() => handleQuickAction('/admin-stats')}
              className="bg-cardBg rounded-2xl shadow-card p-6 cursor-pointer hover:shadow-card-hover transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-chart-line text-accent text-xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-textPrimary mb-1">查看统计报告</h3>
                  <p className="text-sm text-textSecondary">详细的访问和互动数据分析</p>
                </div>
                <i className="fas fa-arrow-right text-textMuted"></i>
              </div>
            </div>

            {/* 更新联系方式 */}
            <div 
              onClick={() => handleQuickAction('/admin-contact')}
              className="bg-cardBg rounded-2xl shadow-card p-6 cursor-pointer hover:shadow-card-hover transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 bg-opacity-10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-address-card text-green-500 text-xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-textPrimary mb-1">更新联系方式</h3>
                  <p className="text-sm text-textSecondary">管理您的邮箱和社交媒体链接</p>
                </div>
                <i className="fas fa-arrow-right text-textMuted"></i>
              </div>
            </div>

            {/* 个性化页面 */}
            <div 
              onClick={() => handleQuickAction('/admin-page-settings')}
              className="bg-cardBg rounded-2xl shadow-card p-6 cursor-pointer hover:shadow-card-hover transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 bg-opacity-10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-palette text-blue-500 text-xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-textPrimary mb-1">个性化页面</h3>
                  <p className="text-sm text-textSecondary">自定义主页的背景和主题颜色</p>
                </div>
                <i className="fas fa-arrow-right text-textMuted"></i>
              </div>
            </div>
          </div>
        </section>

        {/* 最近活动 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-textPrimary mb-6">最近活动</h2>
          <div className="bg-cardBg rounded-2xl shadow-card p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-green-500 bg-opacity-10 rounded-full flex items-center justify-center">
                  <i className="fas fa-upload text-green-500"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-textPrimary">上传了新作品</p>
                  <p className="text-sm text-textSecondary">健康管理APP UI设计</p>
                </div>
                <span className="text-sm text-textMuted">2小时前</span>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-500 bg-opacity-10 rounded-full flex items-center justify-center">
                  <i className="fas fa-comments text-blue-500"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-textPrimary">机器人收到新对话</p>
                  <p className="text-sm text-textSecondary">访客咨询合作事宜</p>
                </div>
                <span className="text-sm text-textMuted">5小时前</span>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-purple-500 bg-opacity-10 rounded-full flex items-center justify-center">
                  <i className="fas fa-edit text-purple-500"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-textPrimary">更新了个人信息</p>
                  <p className="text-sm text-textSecondary">修改了工作经历描述</p>
                </div>
                <span className="text-sm text-textMuted">1天前</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;

