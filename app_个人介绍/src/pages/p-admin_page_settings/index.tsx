

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface PageSettingsFormData {
  backgroundType: 'color' | 'image';
  backgroundColor: string;
  themeColor: string;
  fontFamily: string;
  backgroundImage: File | null;
}

const AdminPageSettings: React.FC = () => {
  const navigate = useNavigate();
  
  // 表单状态
  const [formData, setFormData] = useState<PageSettingsFormData>({
    backgroundType: 'color',
    backgroundColor: '#FFF8F5',
    themeColor: '#FF7A00',
    fontFamily: 'Inter, system-ui, sans-serif',
    backgroundImage: null
  });

  // UI状态
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewImageSrc, setPreviewImageSrc] = useState('');

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '页面设置 - 扉页智汇管理后台';
    return () => { document.title = originalTitle; };
  }, []);

  // 背景类型切换
  const handleBackgroundTypeChange = (type: 'color' | 'image') => {
    setFormData(prev => ({
      ...prev,
      backgroundType: type,
      backgroundImage: type === 'color' ? null : prev.backgroundImage
    }));
    if (type === 'color') {
      setPreviewImageSrc('');
    }
  };

  // 颜色选择
  const handleColorSelection = (color: string, field: 'backgroundColor' | 'themeColor') => {
    setFormData(prev => ({
      ...prev,
      [field]: color
    }));
  };

  // 字体选择
  const handleFontSelection = (fontFamily: string) => {
    setFormData(prev => ({
      ...prev,
      fontFamily
    }));
  };

  // 图片上传
  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      backgroundImage: file
    }));

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreviewImageSrc(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // 移除图片
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData(prev => ({
      ...prev,
      backgroundImage: null
    }));
    setPreviewImageSrc('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 文件输入变化
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
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
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleImageUpload(file);
        if (fileInputRef.current) {
          // @ts-ignore
          fileInputRef.current.files = files;
        }
      }
    }
  };

  // 表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // 模拟保存过程
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  // 重置表单
  const handleReset = () => {
    if (confirm('确定要重置所有设置吗？')) {
      setFormData({
        backgroundType: 'color',
        backgroundColor: '#FFF8F5',
        themeColor: '#FF7A00',
        fontFamily: 'Inter, system-ui, sans-serif',
        backgroundImage: null
      });
      setPreviewImageSrc('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // 退出登录
  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      navigate('/admin-login');
    }
  };

  // 关闭成功模态框
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  // 背景颜色选项
  const backgroundColors = [
    '#FFF8F5', '#FFFFFF', '#F7FAFC', '#EDF2F7',
    '#E2E8F0', '#F0F9FF', '#FEF3C7', '#FDF2F8'
  ];

  // 主题颜色选项
  const themeColors = [
    '#FF7A00', '#3B82F6', '#10B981', '#8B5CF6',
    '#EF4444', '#F59E0B', '#06B6D4', '#EC4899'
  ];

  // 字体选项
  const fontOptions = [
    {
      value: 'Inter, system-ui, sans-serif',
      display: 'AaBbCcDd',
      label: 'Inter (默认)',
      className: 'font-sans'
    },
    {
      value: 'PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif',
      display: 'AaBbCcDd',
      label: 'PingFang SC',
      style: { fontFamily: 'PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif' }
    },
    {
      value: 'Microsoft YaHei, PingFang SC, Hiragino Sans GB, sans-serif',
      display: 'AaBbCcDd',
      label: 'Microsoft YaHei',
      style: { fontFamily: 'Microsoft YaHei, PingFang SC, Hiragino Sans GB, sans-serif' }
    },
    {
      value: 'SimSun, serif',
      display: 'AaBbCcDd',
      label: 'SimSun (宋体)',
      style: { fontFamily: 'SimSun, serif' }
    },
    {
      value: 'KaiTi, serif',
      display: 'AaBbCcDd',
      label: 'KaiTi (楷体)',
      style: { fontFamily: 'KaiTi, serif' }
    },
    {
      value: 'Times New Roman, serif',
      display: 'AaBbCcDd',
      label: 'Times New Roman',
      style: { fontFamily: 'Times New Roman, serif' }
    }
  ];

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
              <span className="text-xl font-bold text-gradient">扉页智汇管理</span>
            </div>
            
            {/* 管理员信息和退出登录 */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://s.coze.cn/image/cRZ3iNmT6uw/" 
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
          <nav className="p-4 space-y-2">
            <Link 
              to="/admin-dashboard" 
              className={`${styles.navLinkHover} flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors`}
            >
              <i className="fas fa-tachometer-alt w-5"></i>
              <span>管理首页</span>
            </Link>
            <Link 
              to="/admin-profile" 
              className={`${styles.navLinkHover} flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors`}
            >
              <i className="fas fa-user w-5"></i>
              <span>个人信息</span>
            </Link>
            <Link 
              to="/admin-portfolio" 
              className={`${styles.navLinkHover} flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors`}
            >
              <i className="fas fa-folder-open w-5"></i>
              <span>作品集管理</span>
            </Link>
            <Link 
              to="/admin-contact" 
              className={`${styles.navLinkHover} flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors`}
            >
              <i className="fas fa-address-book w-5"></i>
              <span>联系方式管理</span>
            </Link>
            <Link 
              to="/admin-bot-settings" 
              className={`${styles.navLinkHover} flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors`}
            >
              <i className="fas fa-robot w-5"></i>
              <span>机器人设置</span>
            </Link>
            <Link 
              to="/admin-stats" 
              className={`${styles.navLinkHover} flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors`}
            >
              <i className="fas fa-chart-bar w-5"></i>
              <span>数据统计</span>
            </Link>
            <div className={`${styles.navLinkActive} flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors`}>
              <i className="fas fa-palette w-5"></i>
              <span>页面设置</span>
            </div>
          </nav>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 ml-64 p-8">
          {/* 页面头部 */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-textPrimary mb-2">页面设置</h1>
                <nav className="text-sm text-textSecondary">
                  <span>管理首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span className="text-primary">页面设置</span>
                </nav>
              </div>
            </div>
          </div>

          {/* 设置表单 */}
          <div className="bg-cardBg rounded-2xl shadow-card p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 背景设置 */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-textPrimary flex items-center">
                  <i className="fas fa-image mr-3 text-primary"></i>
                  背景设置
                </h2>
                
                {/* 背景类型选择 */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-textPrimary">背景类型</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="background-type" 
                        value="color" 
                        checked={formData.backgroundType === 'color'}
                        onChange={() => handleBackgroundTypeChange('color')}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-textSecondary">纯色背景</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="background-type" 
                        value="image" 
                        checked={formData.backgroundType === 'image'}
                        onChange={() => handleBackgroundTypeChange('image')}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-textSecondary">图片背景</span>
                    </label>
                  </div>
                </div>

                {/* 纯色背景设置 */}
                {formData.backgroundType === 'color' && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-textPrimary">背景颜色</label>
                    <div className="grid grid-cols-8 gap-3">
                      {backgroundColors.map((color) => (
                        <div
                          key={color}
                          className={`${styles.colorOption} ${formData.backgroundColor === color ? styles.selected : ''}`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorSelection(color, 'backgroundColor')}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 图片背景设置 */}
                {formData.backgroundType === 'image' && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-textPrimary">背景图片</label>
                    <div 
                      className={`${styles.uploadArea} ${isDragOver ? styles.dragover : ''} p-8 text-center`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        className="hidden"
                        onChange={handleFileInputChange}
                      />
                      {!previewImageSrc ? (
                        <div className="space-y-3">
                          <i className="fas fa-cloud-upload-alt text-4xl text-textMuted"></i>
                          <p className="text-textSecondary">点击上传或拖拽图片到此处</p>
                          <p className="text-xs text-textMuted">支持 JPG、PNG、GIF 格式，文件大小不超过 10MB</p>
                        </div>
                      ) : (
                        <div>
                          <img 
                            src={previewImageSrc} 
                            alt="背景图片预览" 
                            className="max-w-full h-48 object-cover rounded-lg mx-auto"
                          />
                          <button 
                            type="button" 
                            onClick={handleRemoveImage}
                            className="mt-3 px-4 py-2 text-sm text-textSecondary hover:text-primary transition-colors"
                          >
                            <i className="fas fa-trash mr-1"></i>
                            删除图片
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 主题色设置 */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-textPrimary flex items-center">
                  <i className="fas fa-palette mr-3 text-primary"></i>
                  主题色设置
                </h2>
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-textPrimary">主色调</label>
                  <div className="grid grid-cols-8 gap-3">
                    {themeColors.map((color) => (
                      <div
                        key={color}
                        className={`${styles.colorOption} ${formData.themeColor === color ? styles.selected : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelection(color, 'themeColor')}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 字体设置 */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-textPrimary flex items-center">
                  <i className="fas fa-font mr-3 text-primary"></i>
                  字体设置
                </h2>
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-textPrimary">字体选择</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fontOptions.map((font) => (
                      <div
                        key={font.value}
                        className={`${styles.fontOption} ${formData.fontFamily === font.value ? styles.selected : ''}`}
                        onClick={() => handleFontSelection(font.value)}
                      >
                        <div className={`text-lg ${font.className || ''}`} style={font.style}>
                          {font.display}
                        </div>
                        <div className="text-xs text-textMuted mt-1">{font.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 保存按钮 */}
              <div className="flex justify-end space-x-4 pt-8 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={handleReset}
                  className="px-6 py-3 bg-gray-100 text-textSecondary rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  <i className="fas fa-undo mr-2"></i>
                  重置
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-medium shadow-card hover:shadow-card-hover transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      保存中...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save mr-2"></i>
                      保存设置
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      {/* 成功提示模态框 */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseSuccessModal}
        >
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-green-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-textPrimary mb-2">设置保存成功</h3>
              <p className="text-textSecondary mb-6">页面样式设置已成功保存</p>
              <button 
                onClick={handleCloseSuccessModal}
                className="px-6 py-2 bg-primary text-white rounded-lg font-medium"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPageSettings;

