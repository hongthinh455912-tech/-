

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { PortfolioItem, FormData } from './types';

const AdminPortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 状态管理
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '',
    description: '',
    file: null
  });
  const [isFilePreviewVisible, setIsFilePreviewVisible] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 模拟作品数据
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: 'portfolio-1',
      title: '健康管理APP',
      category: 'UI设计',
      description: '一款专注于用户健康数据管理的移动应用，包含步数统计、饮食记录、睡眠监测等功能。',
      uploadTime: '2024-01-15',
      viewCount: 1234,
      fileName: 'mobile_app_ui.png',
      fileUrl: 'https://s.coze.cn/image/-L2QsMY4Ol8/'
    },
    {
      id: 'portfolio-2',
      title: '金融科技企业官网',
      category: '网页设计',
      description: '为金融科技公司设计的现代化企业官网，突出技术创新和专业服务。',
      uploadTime: '2024-01-10',
      viewCount: 856,
      fileName: 'fintech_website.png',
      fileUrl: 'https://s.coze.cn/image/27KB9snJW7w/'
    },
    {
      id: 'portfolio-3',
      title: '智能购物平台',
      category: 'UX设计',
      description: '基于AI推荐的个性化购物平台，优化用户购物体验和转化率。',
      uploadTime: '2024-01-05',
      viewCount: 2100,
      fileName: 'smart_shopping.pdf',
      fileUrl: 'https://s.coze.cn/image/FKBn5Jzh0EQ/'
    },
    {
      id: 'portfolio-4',
      title: '在线教育APP',
      category: 'UI设计',
      description: '面向K12学生的在线学习平台，包含课程学习、作业提交、师生互动等功能。',
      uploadTime: '2023-12-28',
      viewCount: 1567,
      fileName: 'education_app_ui.png',
      fileUrl: 'https://s.coze.cn/image/CMaaQh_rSiw/'
    },
    {
      id: 'portfolio-5',
      title: '数据可视化平台',
      category: '网页设计',
      description: '企业级数据分析和可视化平台，帮助企业快速洞察业务数据。',
      uploadTime: '2023-12-20',
      viewCount: 945,
      fileName: 'data_visualization.mp4',
      fileUrl: 'https://s.coze.cn/image/T-_neuu6X20/'
    }
  ]);

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '作品集管理 - 扉页智汇';
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // 筛选作品
  const filteredItems = portfolioItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // 全选/取消全选
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  // 单个选择
  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id]);
    } else {
      setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    }
  };

  // 新增作品
  const handleAddPortfolio = () => {
    setCurrentEditingId(null);
    setFormData({
      title: '',
      category: '',
      description: '',
      file: null
    });
    setIsFilePreviewVisible(false);
    setShowPortfolioModal(true);
  };

  // 编辑作品
  const handleEditPortfolio = (id: string) => {
    setCurrentEditingId(id);
    const item = portfolioItems.find(item => item.id === id);
    if (item) {
      setFormData({
        title: item.title,
        category: item.category,
        description: item.description,
        file: null
      });
    }
    setIsFilePreviewVisible(false);
    setShowPortfolioModal(true);
  };

  // 删除作品
  const handleDeletePortfolio = (id: string) => {
    setDeleteTargetId(id);
    setShowDeleteModal(true);
  };

  // 确认删除
  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      setPortfolioItems(prev => prev.filter(item => item.id !== deleteTargetId));
      setShowDeleteModal(false);
      alert('作品删除成功！');
    }
  };

  // 批量删除
  const handleBatchDelete = () => {
    if (selectedItems.length > 0) {
      if (confirm(`确定要删除选中的 ${selectedItems.length} 个作品吗？`)) {
        setPortfolioItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
        setSelectedItems([]);
        alert('批量删除成功！');
      }
    }
  };

  // 保存作品
  const handleSavePortfolio = () => {
    if (!formData.title || !formData.category || !formData.file) {
      alert('请填写所有必填字段并上传文件');
      return;
    }

    if (currentEditingId) {
      // 编辑现有作品
      setPortfolioItems(prev => prev.map(item => 
        item.id === currentEditingId 
          ? { 
              ...item, 
              title: formData.title, 
              category: formData.category, 
              description: formData.description 
            }
          : item
      ));
      alert('作品更新成功！');
    } else {
      // 新增作品
      const newItem: PortfolioItem = {
        id: `portfolio-${Date.now()}`,
        title: formData.title,
        category: formData.category,
        description: formData.description,
        uploadTime: new Date().toISOString().split('T')[0],
        viewCount: 0,
        fileName: formData.file!.name,
        fileUrl: 'https://s.coze.cn/image/placeholder.png'
      };
      setPortfolioItems(prev => [...prev, newItem]);
      alert('作品添加成功！');
    }

    setShowPortfolioModal(false);
  };

  // 文件上传
  const handleFileUpload = (file: File) => {
    setFormData(prev => ({ ...prev, file }));
    setIsFilePreviewVisible(true);
  };

  // 移除文件
  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData(prev => ({ ...prev, file: null }));
    setIsFilePreviewVisible(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 拖拽处理
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // 退出登录
  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      navigate('/admin-login');
    }
  };

  // 获取文件图标
  const getFileIcon = (fileName: string) => {
    const fileTypes: { [key: string]: string } = {
      'image/': 'fas fa-image',
      'video/': 'fas fa-video',
      '.pdf': 'fas fa-file-pdf',
      '.doc': 'fas fa-file-word',
      '.docx': 'fas fa-file-word',
      '.ppt': 'fas fa-file-powerpoint',
      '.pptx': 'fas fa-file-powerpoint'
    };

    for (const [type, icon] of Object.entries(fileTypes)) {
      if (fileName.endsWith(type)) {
        return icon;
      }
    }
    return 'fas fa-file';
  };

  // 格式化文件大小
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 获取类别样式
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'UI设计':
        return 'px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm';
      case 'UX设计':
        return 'px-3 py-1 bg-accent bg-opacity-10 text-accent rounded-full text-sm';
      case '网页设计':
        return 'px-3 py-1 bg-secondary bg-opacity-10 text-secondary rounded-full text-sm';
      default:
        return 'px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm';
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 bg-cardBg shadow-soft z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo和产品名称 */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <i className="fas fa-book-open text-white text-sm"></i>
              </div>
              <span className="text-xl font-bold text-gradient">扉页智汇</span>
            </div>
            
            {/* 管理员信息 */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://s.coze.cn/image/sWMXhkrErzQ/" 
                  alt="管理员头像" 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm text-textPrimary">张小明</span>
              </div>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-textSecondary hover:text-primary transition-colors"
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
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/admin-dashboard" 
                  className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:text-primary hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <i className="fas fa-tachometer-alt w-5"></i>
                  <span>管理首页</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin-profile" 
                  className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:text-primary hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <i className="fas fa-user-edit w-5"></i>
                  <span>个人信息</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin-portfolio" 
                  className={`${styles.navLinkActive} flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors`}
                >
                  <i className="fas fa-folder-open w-5"></i>
                  <span>作品集管理</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin-contact" 
                  className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:text-primary hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <i className="fas fa-address-book w-5"></i>
                  <span>联系方式管理</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin-bot-settings" 
                  className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:text-primary hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <i className="fas fa-robot w-5"></i>
                  <span>机器人设置</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin-stats" 
                  className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:text-primary hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <i className="fas fa-chart-bar w-5"></i>
                  <span>数据统计</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin-page-settings" 
                  className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:text-primary hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <i className="fas fa-palette w-5"></i>
                  <span>页面设置</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 ml-64 p-6">
          {/* 页面头部 */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-textPrimary">作品集管理</h1>
                <nav className="flex items-center space-x-2 text-sm text-textSecondary mt-1">
                  <Link to="/admin-dashboard" className="hover:text-primary">管理首页</Link>
                  <i className="fas fa-chevron-right text-xs"></i>
                  <span>作品集管理</span>
                </nav>
              </div>
              <button 
                onClick={handleAddPortfolio}
                className="px-6 py-2 bg-primary text-white rounded-xl font-medium shadow-card hover:shadow-card-hover transition-all"
              >
                <i className="fas fa-plus mr-2"></i>
                新增作品
              </button>
            </div>
          </div>

          {/* 工具栏区域 */}
          <div className="bg-cardBg rounded-2xl shadow-card p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              {/* 搜索框 */}
              <div className="relative">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索作品名称或描述..." 
                  className={`w-full md:w-80 pl-10 pr-4 py-3 border border-gray-200 rounded-xl ${styles.searchInput}`}
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted"></i>
              </div>
              
              {/* 筛选和操作 */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className={`px-4 py-3 border border-gray-200 rounded-xl ${styles.searchInput} bg-white`}
                >
                  <option value="">全部类别</option>
                  <option value="UI设计">UI设计</option>
                  <option value="UX设计">UX设计</option>
                  <option value="网页设计">网页设计</option>
                </select>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={handleBatchDelete}
                    disabled={selectedItems.length === 0}
                    className={`px-4 py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl font-medium hover:bg-red-100 transition-colors ${
                      selectedItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <i className="fas fa-trash mr-2"></i>
                    批量删除
                  </button>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('');
                      alert('数据已刷新！');
                    }}
                    className="px-4 py-3 bg-gray-50 text-textSecondary border border-gray-200 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                  >
                    <i className="fas fa-sync-alt mr-2"></i>
                    刷新
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 作品列表 */}
          <div className="bg-cardBg rounded-2xl shadow-card overflow-hidden">
            {/* 表格头部 */}
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center space-x-4">
                <input 
                  type="checkbox" 
                  checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <div className="flex-1 grid grid-cols-12 gap-4 text-sm font-medium text-textSecondary">
                  <div className="col-span-3">作品名称</div>
                  <div className="col-span-2">类别</div>
                  <div className="col-span-3">描述</div>
                  <div className="col-span-2">上传时间</div>
                  <div className="col-span-1">查看次数</div>
                  <div className="col-span-1 text-center">操作</div>
                </div>
              </div>
            </div>

            {/* 表格内容 */}
            <div className="divide-y divide-gray-100">
              {filteredItems.map((item) => (
                <div key={item.id} className={`${styles.tableRow} px-6 py-4 hover:bg-gray-50 transition-colors`}>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="checkbox" 
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-3">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={item.fileUrl} 
                            alt={item.title} 
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-medium text-textPrimary">{item.title}</h3>
                            <p className="text-sm text-textMuted">{item.fileName}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className={getCategoryStyle(item.category)}>{item.category}</span>
                      </div>
                      <div className="col-span-3">
                        <p 
                          className="text-sm text-textSecondary truncate max-w-xs" 
                          title={item.description}
                        >
                          {item.description}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-sm text-textSecondary">{item.uploadTime}</span>
                      </div>
                      <div className="col-span-1">
                        <span className="text-sm text-textSecondary">{item.viewCount.toLocaleString()}</span>
                      </div>
                      <div className="col-span-1">
                        <div className="flex space-x-2 justify-center">
                          <button 
                            onClick={() => handleEditPortfolio(item.id)}
                            className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" 
                            title="编辑"
                          >
                            <i className="fas fa-edit text-sm"></i>
                          </button>
                          <button 
                            onClick={() => handleDeletePortfolio(item.id)}
                            className="w-8 h-8 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" 
                            title="删除"
                          >
                            <i className="fas fa-trash text-sm"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 分页区域 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 space-y-4 sm:space-y-0">
            <div className="text-sm text-textSecondary">
              显示第 <span className="font-medium">1</span> 到 <span className="font-medium">{filteredItems.length}</span> 条，共 <span className="font-medium">{portfolioItems.length}</span> 条记录
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fas fa-chevron-left mr-1"></i>
                上一页
              </button>
              
              <div className="flex space-x-1">
                <button 
                  onClick={() => setCurrentPage(1)}
                  className={`px-3 py-2 text-sm rounded-lg ${
                    currentPage === 1 ? 'bg-primary text-white' : 'border border-gray-200 hover:bg-gray-50 transition-colors'
                  }`}
                >
                  1
                </button>
                <button 
                  onClick={() => setCurrentPage(2)}
                  className={`px-3 py-2 text-sm rounded-lg ${
                    currentPage === 2 ? 'bg-primary text-white' : 'border border-gray-200 hover:bg-gray-50 transition-colors'
                  }`}
                >
                  2
                </button>
                <button 
                  onClick={() => setCurrentPage(3)}
                  className={`px-3 py-2 text-sm rounded-lg ${
                    currentPage === 3 ? 'bg-primary text-white' : 'border border-gray-200 hover:bg-gray-50 transition-colors'
                  }`}
                >
                  3
                </button>
              </div>
              
              <button 
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                下一页
                <i className="fas fa-chevron-right ml-1"></i>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* 新增/编辑作品模态框 */}
      {showPortfolioModal && (
        <div 
          className={`fixed inset-0 z-50 ${styles.modalOverlay}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowPortfolioModal(false);
            }
          }}
        >
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className={`${styles.modalContent} bg-cardBg rounded-2xl shadow-card w-full max-w-2xl`}>
              {/* 模态框头部 */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-textPrimary">
                  {currentEditingId ? '编辑作品' : '新增作品'}
                </h2>
                <button 
                  onClick={() => setShowPortfolioModal(false)}
                  className="w-8 h-8 text-textMuted hover:text-textPrimary transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              {/* 模态框内容 */}
              <div className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 作品名称 */}
                    <div className="md:col-span-2">
                      <label htmlFor="portfolio-title" className="block text-sm font-medium text-textPrimary mb-2">
                        作品名称 *
                      </label>
                      <input 
                        type="text" 
                        id="portfolio-title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className={`w-full px-4 py-3 border border-gray-200 rounded-xl ${styles.searchInput}`}
                        placeholder="请输入作品名称" 
                        required
                      />
                    </div>
                    
                    {/* 作品类别 */}
                    <div>
                      <label htmlFor="portfolio-category" className="block text-sm font-medium text-textPrimary mb-2">
                        作品类别 *
                      </label>
                      <select 
                        id="portfolio-category"
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className={`w-full px-4 py-3 border border-gray-200 rounded-xl ${styles.searchInput}`}
                        required
                      >
                        <option value="">请选择类别</option>
                        <option value="UI设计">UI设计</option>
                        <option value="UX设计">UX设计</option>
                        <option value="网页设计">网页设计</option>
                      </select>
                    </div>
                    
                    {/* 作品文件 */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-textPrimary mb-2">作品文件 *</label>
                      <div 
                        className={`${styles.fileUploadArea} ${isDragOver ? 'dragover' : ''} rounded-xl p-8 text-center cursor-pointer`}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <input 
                          ref={fileInputRef}
                          type="file" 
                          className={styles.fileInput}
                          accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file);
                            }
                          }}
                          required
                        />
                        {!isFilePreviewVisible ? (
                          <div className="space-y-3">
                            <i className="fas fa-cloud-upload-alt text-4xl text-textMuted"></i>
                            <div>
                              <p className="text-sm font-medium text-textPrimary">点击上传或拖拽文件到此处</p>
                              <p className="text-xs text-textMuted mt-1">支持图片、视频、文档等格式，最大50MB</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                              <i className={`${getFileIcon(formData.file!.name)} text-2xl text-primary`}></i>
                              <div className="flex-1 text-left">
                                <p className="font-medium text-textPrimary">{formData.file!.name}</p>
                                <p className="text-sm text-textMuted">{formatFileSize(formData.file!.size)}</p>
                              </div>
                              <button 
                                type="button" 
                                onClick={handleRemoveFile}
                                className="text-red-500 hover:text-red-700"
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* 作品描述 */}
                    <div className="md:col-span-2">
                      <label htmlFor="portfolio-description" className="block text-sm font-medium text-textPrimary mb-2">
                        作品描述
                      </label>
                      <textarea 
                        id="portfolio-description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                        className={`w-full px-4 py-3 border border-gray-200 rounded-xl ${styles.searchInput} resize-none`}
                        placeholder="请输入作品描述"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 模态框底部 */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                <button 
                  onClick={() => setShowPortfolioModal(false)}
                  className="px-6 py-3 text-textSecondary border border-gray-200 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={handleSavePortfolio}
                  className="px-6 py-3 bg-primary text-white rounded-xl font-medium shadow-card hover:shadow-card-hover transition-all"
                >
                  <i className="fas fa-save mr-2"></i>
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 删除确认模态框 */}
      {showDeleteModal && (
        <div 
          className={`fixed inset-0 z-50 ${styles.modalOverlay}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowDeleteModal(false);
            }
          }}
        >
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-cardBg rounded-2xl shadow-card w-full max-w-md">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-textPrimary mb-2">确认删除</h3>
                <p className="text-textSecondary mb-6">
                  确定要删除这个作品吗？删除后将无法恢复。
                </p>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 py-3 text-textSecondary border border-gray-200 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    onClick={handleConfirmDelete}
                    className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolioPage;

