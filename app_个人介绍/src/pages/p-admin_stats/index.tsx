

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const AdminStatsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days');
  const [trendTimeDimension, setTrendTimeDimension] = useState('daily');

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '数据统计 - 扉页智汇';
    return () => { document.title = originalTitle; };
  }, []);

  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      navigate('/admin-login');
    }
  };

  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRange = event.target.value;
    setSelectedTimeRange(selectedRange);
    console.log('时间范围已更改为：', selectedRange);
  };

  const handleExportData = () => {
    console.log('开始导出数据');
    alert('数据导出功能正在开发中');
  };

  const handleTrendDimensionChange = (dimension: string) => {
    setTrendTimeDimension(dimension);
    console.log('趋势图时间维度已更改为：', dimension);
  };

  const handleViewAllWorks = () => {
    navigate('/admin-portfolio');
  };

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
              <span className="text-xl font-bold text-gradient">扉页智汇</span>
            </div>
            
            {/* 管理员信息 */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://s.coze.cn/image/arCTDOjosWs/" 
                  alt="管理员头像" 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm text-textPrimary">张小明</span>
              </div>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-textSecondary hover:text-primary transition-colors"
              >
                <i className="fas fa-sign-out-alt mr-1"></i>
                退出登录
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区域 */}
      <div className="flex pt-16">
        {/* 左侧菜单 */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-cardBg shadow-soft overflow-y-auto">
          <nav className="p-4 space-y-2">
            <Link 
              to="/admin-dashboard" 
              className={`${styles.sidebarLink} flex items-center space-x-3 px-4 py-3 text-textSecondary rounded-xl transition-colors`}
            >
              <i className="fas fa-home text-lg"></i>
              <span>管理首页</span>
            </Link>
            <Link 
              to="/admin-profile" 
              className={`${styles.sidebarLink} flex items-center space-x-3 px-4 py-3 text-textSecondary rounded-xl transition-colors`}
            >
              <i className="fas fa-user text-lg"></i>
              <span>个人信息</span>
            </Link>
            <Link 
              to="/admin-portfolio" 
              className={`${styles.sidebarLink} flex items-center space-x-3 px-4 py-3 text-textSecondary rounded-xl transition-colors`}
            >
              <i className="fas fa-folder-open text-lg"></i>
              <span>作品集管理</span>
            </Link>
            <Link 
              to="/admin-contact" 
              className={`${styles.sidebarLink} flex items-center space-x-3 px-4 py-3 text-textSecondary rounded-xl transition-colors`}
            >
              <i className="fas fa-address-book text-lg"></i>
              <span>联系方式管理</span>
            </Link>
            <Link 
              to="/admin-bot-settings" 
              className={`${styles.sidebarLink} flex items-center space-x-3 px-4 py-3 text-textSecondary rounded-xl transition-colors`}
            >
              <i className="fas fa-robot text-lg"></i>
              <span>机器人设置</span>
            </Link>
            <Link 
              to="/admin-stats" 
              className={`${styles.sidebarLink} ${styles.active} flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors`}
            >
              <i className="fas fa-chart-bar text-lg"></i>
              <span>数据统计</span>
            </Link>
            <Link 
              to="/admin-page-settings" 
              className={`${styles.sidebarLink} flex items-center space-x-3 px-4 py-3 text-textSecondary rounded-xl transition-colors`}
            >
              <i className="fas fa-cog text-lg"></i>
              <span>页面设置</span>
            </Link>
          </nav>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 ml-64 p-8">
          {/* 页面头部 */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-textPrimary mb-2">数据统计</h1>
                <nav className="text-sm text-textSecondary">
                  <span>管理首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span className="text-primary">数据统计</span>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <select 
                  value={selectedTimeRange}
                  onChange={handleTimeRangeChange}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="7days">最近7天</option>
                  <option value="30days">最近30天</option>
                  <option value="90days">最近90天</option>
                  <option value="1year">最近1年</option>
                </select>
                <button 
                  onClick={handleExportData}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors"
                >
                  <i className="fas fa-download mr-1"></i>
                  导出数据
                </button>
              </div>
            </div>
          </div>

          {/* 关键指标卡片 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* 总访问量 */}
            <div className={`${styles.statCard} bg-cardBg rounded-2xl shadow-card p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-textSecondary text-sm mb-1">总访问量</p>
                  <p className="text-3xl font-bold text-textPrimary">12,456</p>
                  <p className="text-green-500 text-sm mt-1">
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
                  <p className="text-textSecondary text-sm mb-1">今日访问量</p>
                  <p className="text-3xl font-bold text-textPrimary">89</p>
                  <p className="text-green-500 text-sm mt-1">
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
                  <p className="text-textSecondary text-sm mb-1">作品总数</p>
                  <p className="text-3xl font-bold text-textPrimary">24</p>
                  <p className="text-blue-500 text-sm mt-1">
                    <i className="fas fa-plus mr-1"></i>
                    本月新增3个
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-folder-open text-accent text-xl"></i>
                </div>
              </div>
            </div>

            {/* 平均停留时间 */}
            <div className={`${styles.statCard} bg-cardBg rounded-2xl shadow-card p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-textSecondary text-sm mb-1">平均停留时间</p>
                  <p className="text-3xl font-bold text-textPrimary">3:42</p>
                  <p className="text-green-500 text-sm mt-1">
                    <i className="fas fa-arrow-up mr-1"></i>
                    +15.3% 较上月
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-clock text-primary text-xl"></i>
                </div>
              </div>
            </div>
          </div>

          {/* 图表区域 */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* 访问量趋势图 */}
            <div className={styles.chartContainer}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-textPrimary">访问量趋势</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleTrendDimensionChange('daily')}
                    className={`px-3 py-1 text-xs rounded-lg ${
                      trendTimeDimension === 'daily' 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-200 text-textSecondary'
                    }`}
                  >
                    日
                  </button>
                  <button 
                    onClick={() => handleTrendDimensionChange('weekly')}
                    className={`px-3 py-1 text-xs rounded-lg ${
                      trendTimeDimension === 'weekly' 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-200 text-textSecondary'
                    }`}
                  >
                    周
                  </button>
                  <button 
                    onClick={() => handleTrendDimensionChange('monthly')}
                    className={`px-3 py-1 text-xs rounded-lg ${
                      trendTimeDimension === 'monthly' 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-200 text-textSecondary'
                    }`}
                  >
                    月
                  </button>
                </div>
              </div>
              <div className={styles.lineChart}>
                {/* 模拟折线图 */}
                <svg width="100%" height="100%" viewBox="0 0 400 200">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor:'#FF7A00', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#FFB347', stopOpacity:1}} />
                    </linearGradient>
                  </defs>
                  {/* 网格线 */}
                  <g stroke="#f0f0f0" strokeWidth="1">
                    <line x1="40" y1="20" x2="380" y2="20"/>
                    <line x1="40" y1="60" x2="380" y2="60"/>
                    <line x1="40" y1="100" x2="380" y2="100"/>
                    <line x1="40" y1="140" x2="380" y2="140"/>
                    <line x1="40" y1="180" x2="380" y2="180"/>
                  </g>
                  {/* 数据线 */}
                  <polyline 
                    fill="none" 
                    stroke="url(#lineGradient)" 
                    strokeWidth="3" 
                    points="40,120 80,90 120,110 160,70 200,85 240,60 280,95 320,75 360,65 380,55"
                  />
                  {/* 数据点 */}
                  <circle cx="40" cy="120" r="4" fill="#FF7A00"/>
                  <circle cx="80" cy="90" r="4" fill="#FF7A00"/>
                  <circle cx="120" cy="110" r="4" fill="#FF7A00"/>
                  <circle cx="160" cy="70" r="4" fill="#FF7A00"/>
                  <circle cx="200" cy="85" r="4" fill="#FF7A00"/>
                  <circle cx="240" cy="60" r="4" fill="#FF7A00"/>
                  <circle cx="280" cy="95" r="4" fill="#FF7A00"/>
                  <circle cx="320" cy="75" r="4" fill="#FF7A00"/>
                  <circle cx="360" cy="65" r="4" fill="#FF7A00"/>
                  <circle cx="380" cy="55" r="4" fill="#FF7A00"/>
                  {/* Y轴标签 */}
                  <text x="30" y="25" textAnchor="end" fontSize="10" fill="#718096">150</text>
                  <text x="30" y="65" textAnchor="end" fontSize="10" fill="#718096">120</text>
                  <text x="30" y="105" textAnchor="end" fontSize="10" fill="#718096">90</text>
                  <text x="30" y="145" textAnchor="end" fontSize="10" fill="#718096">60</text>
                  <text x="30" y="185" textAnchor="end" fontSize="10" fill="#718096">30</text>
                </svg>
              </div>
            </div>

            {/* 作品集查看次数排行榜 */}
            <div className={styles.chartContainer}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-textPrimary">作品查看排行榜</h3>
                <button 
                  onClick={handleViewAllWorks}
                  className="text-sm text-primary hover:text-opacity-80 transition-colors"
                >
                  查看全部 <i className="fas fa-arrow-right ml-1"></i>
                </button>
              </div>
              <div className="space-y-4">
                {/* 排名项目1 */}
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm font-bold">1</div>
                  <img 
                    src="https://s.coze.cn/image/oWYuMuVnk8s/" 
                    alt="健康管理APP" 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-textPrimary">健康管理APP</p>
                    <p className="text-sm text-textSecondary">UI设计</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-textPrimary">2,156</p>
                    <p className="text-xs text-textSecondary">次查看</p>
                  </div>
                </div>
                
                {/* 排名项目2 */}
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-secondary text-white rounded-lg flex items-center justify-center text-sm font-bold">2</div>
                  <img 
                    src="https://s.coze.cn/image/aNHz59wTTa0/" 
                    alt="智能购物平台" 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-textPrimary">智能购物平台</p>
                    <p className="text-sm text-textSecondary">UX设计</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-textPrimary">1,892</p>
                    <p className="text-xs text-textSecondary">次查看</p>
                  </div>
                </div>
                
                {/* 排名项目3 */}
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-accent text-white rounded-lg flex items-center justify-center text-sm font-bold">3</div>
                  <img 
                    src="https://s.coze.cn/image/LOZR_Y3xWxk/" 
                    alt="兴趣社交APP" 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-textPrimary">兴趣社交APP</p>
                    <p className="text-sm text-textSecondary">UX设计</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-textPrimary">1,567</p>
                    <p className="text-xs text-textSecondary">次查看</p>
                  </div>
                </div>
                
                {/* 排名项目4 */}
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-400 text-white rounded-lg flex items-center justify-center text-sm font-bold">4</div>
                  <img 
                    src="https://s.coze.cn/image/zaeb92oJZFw/" 
                    alt="在线教育APP" 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-textPrimary">在线教育APP</p>
                    <p className="text-sm text-textSecondary">UI设计</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-textPrimary">1,234</p>
                    <p className="text-xs text-textSecondary">次查看</p>
                  </div>
                </div>
                
                {/* 排名项目5 */}
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-400 text-white rounded-lg flex items-center justify-center text-sm font-bold">5</div>
                  <img 
                    src="https://s.coze.cn/image/KQqw0XYcTgI/" 
                    alt="金融科技企业官网" 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-textPrimary">金融科技企业官网</p>
                    <p className="text-sm text-textSecondary">网页设计</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-textPrimary">856</p>
                    <p className="text-xs text-textSecondary">次查看</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 详细统计信息 */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 访问来源分析 */}
            <div className={`lg:col-span-2 ${styles.chartContainer}`}>
              <h3 className="text-lg font-semibold text-textPrimary mb-6">访问来源分析</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                    <span className="text-textPrimary">直接访问</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div className="w-18 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-secondary rounded-full"></div>
                    <span className="text-textPrimary">搜索引擎</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div className="w-12 h-2 bg-secondary rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-accent rounded-full"></div>
                    <span className="text-textPrimary">社交媒体</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div className="w-6 h-2 bg-accent rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <span className="text-textPrimary">其他</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div className="w-3 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 热门页面 */}
            <div className={styles.chartContainer}>
              <h3 className="text-lg font-semibold text-textPrimary mb-6">热门页面</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-textPrimary">首页</p>
                    <p className="text-sm text-textSecondary">/</p>
                  </div>
                  <p className="font-bold text-textPrimary">3,245</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-textPrimary">作品集</p>
                    <p className="text-sm text-textSecondary">/portfolio</p>
                  </div>
                  <p className="font-bold text-textPrimary">2,891</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-textPrimary">关于我</p>
                    <p className="text-sm text-textSecondary">/about</p>
                  </div>
                  <p className="font-bold text-textPrimary">1,567</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-textPrimary">联系方式</p>
                    <p className="text-sm text-textSecondary">/contact</p>
                  </div>
                  <p className="font-bold text-textPrimary">987</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-textPrimary">作品详情</p>
                    <p className="text-sm text-textSecondary">/portfolio/*</p>
                  </div>
                  <p className="font-bold text-textPrimary">4,567</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminStatsPage;

