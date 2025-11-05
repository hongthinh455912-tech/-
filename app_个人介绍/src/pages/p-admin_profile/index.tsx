

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface FormData {
  fullName: string;
  positionTag: string;
  bio: string;
  avatar: string;
}

interface ToastState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

const AdminProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bioEditorRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: '张小明',
    positionTag: 'UI/UX设计师 & 前端开发者',
    bio: `
      <p><strong>教育背景：</strong></p>
      <p>清华大学 设计学硕士 (2016.09 - 2019.06)</p>
      <br>
      <p><strong>工作经历：</strong></p>
      <p>高级UI设计师 @ 字节跳动 (2020.03 - 至今)</p>
      <p>UI设计师 @ 腾讯 (2019.07 - 2020.02)</p>
      <br>
      <p><strong>技能特长：</strong></p>
      <p>Figma、Sketch、Photoshop、HTML/CSS、JavaScript、React</p>
      <br>
      <p>专注于用户体验设计和前端开发，致力于创造美观、易用的数字产品。热爱设计，追求细节，相信好的设计能够改变世界。</p>
    `,
    avatar: 'https://s.coze.cn/image/ppqZEEkvYYs/'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: 'success',
    message: ''
  });

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '个人信息管理 - 扉页智汇';
    return () => { document.title = originalTitle; };
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('error', '文件大小不能超过2MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({ ...prev, avatar: result }));
        showToast('success', '头像上传成功');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value || null);
    bioEditorRef.current?.focus();
  };

  const handleLinkInsert = () => {
    const url = prompt('请输入链接地址:');
    if (url) {
      document.execCommand('createLink', false, url);
    }
    bioEditorRef.current?.focus();
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!formData.fullName.trim()) {
      showToast('error', '请输入姓名');
      return;
    }
    
    if (!formData.positionTag.trim()) {
      showToast('error', '请输入职位/标签');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log('保存个人信息:', formData);
      setIsSubmitting(false);
      showToast('success', '个人信息保存成功！');
    }, 1500);
  };

  const handleCancel = () => {
    if (confirm('确定要取消修改吗？未保存的更改将丢失。')) {
      setFormData({
        fullName: '张小明',
        positionTag: 'UI/UX设计师 & 前端开发者',
        bio: `
          <p><strong>教育背景：</strong></p>
          <p>清华大学 设计学硕士 (2016.09 - 2019.06)</p>
          <br>
          <p><strong>工作经历：</strong></p>
          <p>高级UI设计师 @ 字节跳动 (2020.03 - 至今)</p>
          <p>UI设计师 @ 腾讯 (2019.07 - 2020.02)</p>
          <br>
          <p><strong>技能特长：</strong></p>
          <p>Figma、Sketch、Photoshop、HTML/CSS、JavaScript、React</p>
          <br>
          <p>专注于用户体验设计和前端开发，致力于创造美观、易用的数字产品。热爱设计，追求细节，相信好的设计能够改变世界。</p>
        `,
        avatar: 'https://s.coze.cn/image/ppqZEEkvYYs/'
      });
      showToast('success', '已重置为原始数据');
    }
  };

  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      navigate('/admin-login');
    }
  };

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleEditorFocus = () => {
    const editor = bioEditorRef.current;
    if (editor && editor.textContent?.trim() === '') {
      editor.innerHTML = '';
    }
  };

  const handleEditorBlur = () => {
    const editor = bioEditorRef.current;
    if (editor && editor.textContent?.trim() === '') {
      editor.innerHTML = '<div class="text-textMuted">请输入您的个人简介...</div>';
    }
  };

  const handleEditorInput = () => {
    const editor = bioEditorRef.current;
    if (editor) {
      setFormData(prev => ({ ...prev, bio: editor.innerHTML }));
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
              <div className={`w-8 h-8 ${styles.gradientBg} rounded-lg flex items-center justify-center`}>
                <i className="fas fa-book-open text-white text-sm"></i>
              </div>
              <span className="text-xl font-bold text-primary">扉页智汇管理</span>
            </div>
            
            {/* 管理员信息 */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://s.coze.cn/image/T9YDMwbe4Rk/" 
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
      <main className="pt-16 flex">
        {/* 左侧菜单 */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-cardBg shadow-soft overflow-y-auto">
          <nav className="p-4 space-y-2">
            <Link 
              to="/admin-dashboard" 
              className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:text-primary hover:bg-tertiary rounded-xl transition-all"
            >
              <i className="fas fa-tachometer-alt w-5"></i>
              <span>管理首页</span>
            </Link>
            <Link 
              to="/admin-profile" 
              className={`${styles.navLinkActive} flex items-center space-x-3 px-4 py-3 rounded-xl transition-all`}
            >
              <i className="fas fa-user w-5"></i>
              <span>个人信息</span>
            </Link>
            <Link 
              to="/admin-portfolio" 
              className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:text-primary hover:bg-tertiary rounded-xl transition-all"
            >
              <i className="fas fa-folder-open w-5"></i>
              <span>作品集管理</span>
            </Link>
            <Link 
              to="/admin-contact" 
              className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:text-primary hover:bg-tertiary rounded-xl transition-all"
            >
              <i className="fas fa-address-book w-5"></i>
              <span>联系方式管理</span>
            </Link>
            <Link 
              to="/admin-bot-settings" 
              className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:text-primary hover:bg-tertiary rounded-xl transition-all"
            >
              <i className="fas fa-robot w-5"></i>
              <span>机器人设置</span>
            </Link>
            <Link 
              to="/admin-stats" 
              className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:text-primary hover:bg-tertiary rounded-xl transition-all"
            >
              <i className="fas fa-chart-bar w-5"></i>
              <span>数据统计</span>
            </Link>
            <Link 
              to="/admin-page-settings" 
              className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:text-primary hover:bg-tertiary rounded-xl transition-all"
            >
              <i className="fas fa-palette w-5"></i>
              <span>页面设置</span>
            </Link>
          </nav>
        </aside>

        {/* 主内容区 */}
        <div className="flex-1 ml-64 p-8">
          {/* 页面头部 */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-textPrimary">个人信息管理</h1>
                <nav className="mt-2">
                  <ol className="flex items-center space-x-2 text-sm text-textSecondary">
                    <li>
                      <Link to="/admin-dashboard" className="hover:text-primary">管理首页</Link>
                    </li>
                    <li><i className="fas fa-chevron-right text-xs"></i></li>
                    <li className="text-textPrimary">个人信息管理</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>

          {/* 表单区域 */}
          <div className="bg-cardBg rounded-2xl shadow-card p-8">
            <form onSubmit={handleFormSubmit} className="space-y-8">
              {/* 头像上传区域 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-textPrimary">头像设置</h3>
                <div className="flex items-center space-x-8">
                  <div className="relative">
                    <img 
                      src={formData.avatar} 
                      alt="当前头像" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-card">
                      <i className="fas fa-camera text-white text-xs"></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label 
                      htmlFor="avatar-upload" 
                      className={`${styles.avatarUpload} block w-full px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:border-primary transition-colors`}
                      onClick={() => avatarInputRef.current?.click()}
                    >
                      <i className="fas fa-cloud-upload-alt text-2xl text-textMuted mb-2"></i>
                      <p className="text-sm text-textSecondary">点击上传头像</p>
                      <p className="text-xs text-textMuted mt-1">支持 JPG、PNG 格式，文件大小不超过 2MB</p>
                    </label>
                    <input 
                      type="file" 
                      id="avatar-upload" 
                      ref={avatarInputRef}
                      onChange={handleAvatarUpload}
                      accept="image/*" 
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* 基本信息区域 */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-textPrimary">基本信息</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* 姓名 */}
                  <div className="space-y-2">
                    <label htmlFor="full-name" className="block text-sm font-medium text-textPrimary">姓名 *</label>
                    <input 
                      type="text" 
                      id="full-name" 
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full px-4 py-3 border border-gray-200 rounded-xl ${styles.formInput}`}
                      required
                    />
                  </div>
                  
                  {/* 职位/标签 */}
                  <div className="space-y-2">
                    <label htmlFor="position-tag" className="block text-sm font-medium text-textPrimary">职位/标签 *</label>
                    <input 
                      type="text" 
                      id="position-tag" 
                      value={formData.positionTag}
                      onChange={(e) => handleInputChange('positionTag', e.target.value)}
                      className={`w-full px-4 py-3 border border-gray-200 rounded-xl ${styles.formInput}`}
                      required
                    />
                  </div>
                </div>

                {/* 个人简介 */}
                <div className="space-y-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-textPrimary">个人简介</label>
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    {/* 富文本编辑器工具栏 */}
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 border-b border-gray-200">
                      <button 
                        type="button" 
                        onClick={() => handleEditorCommand('bold')}
                        className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                      >
                        <i className="fas fa-bold"></i>
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleEditorCommand('italic')}
                        className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                      >
                        <i className="fas fa-italic"></i>
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleEditorCommand('underline')}
                        className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                      >
                        <i className="fas fa-underline"></i>
                      </button>
                      <div className="h-4 w-px bg-gray-300"></div>
                      <button 
                        type="button" 
                        onClick={handleLinkInsert}
                        className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                      >
                        <i className="fas fa-link"></i>
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleEditorCommand('insertUnorderedList')}
                        className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                      >
                        <i className="fas fa-list"></i>
                      </button>
                    </div>
                    {/* 编辑器内容区 */}
                    <div 
                      ref={bioEditorRef}
                      contentEditable="true" 
                      onInput={handleEditorInput}
                      onFocus={handleEditorFocus}
                      onBlur={handleEditorBlur}
                      className={`w-full p-4 min-h-48 ${styles.formInput} bg-white`}
                      dangerouslySetInnerHTML={{ __html: formData.bio }}
                    />
                  </div>
                </div>
              </div>

              {/* 操作按钮区域 */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={handleCancel}
                  className="px-6 py-3 text-textSecondary border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-opacity-90 transition-colors flex items-center space-x-2"
                >
                  <span>{isSubmitting ? '保存中...' : '保存修改'}</span>
                  {isSubmitting && <div className={styles.loadingSpinner}></div>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Toast提示 */}
      <div className={`${styles.toast} ${toast.show ? styles.toastShow : ''} ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-3 rounded-xl shadow-lg`}>
        <div className="flex items-center space-x-2">
          <i className={toast.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}></i>
          <span>{toast.message}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;

