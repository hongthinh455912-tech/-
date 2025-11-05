

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const usernameInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '后台登录 - 扉页智汇';
    return () => { document.title = originalTitle; };
  }, []);

  // 自动聚焦到用户名输入框
  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  // 键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Enter 快速登录
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (validateForm()) {
          handleSubmit(e as any);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [formData]);

  // 显示错误信息
  const showError = (message: string) => {
    setErrorText(message);
    setShowErrorMessage(true);
    setTimeout(() => {
      setShowErrorMessage(false);
    }, 5000);
  };

  // 隐藏错误信息
  const hideError = () => {
    setShowErrorMessage(false);
  };

  // 表单验证
  const validateForm = () => {
    const { username, password } = formData;

    if (!username.trim()) {
      showError('请输入用户名或邮箱');
      if (usernameInputRef.current) {
        usernameInputRef.current.focus();
      }
      return false;
    }

    if (!password.trim()) {
      showError('请输入密码');
      return false;
    }

    // 邮箱格式验证（如果输入的是邮箱）
    if (username.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(username)) {
        showError('请输入有效的邮箱地址');
        if (usernameInputRef.current) {
          usernameInputRef.current.focus();
        }
        return false;
      }
    }

    hideError();
    return true;
  };

  // 密码显示/隐藏切换
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // 表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // 模拟登录请求
    setTimeout(() => {
      setIsLoading(false);
      
      // 这里应该是实际的登录验证逻辑
      // 由于这是演示项目，我们直接跳转到管理后台
      navigate('/admin-dashboard');
    }, 1500);
  };

  // 忘记密码链接点击
  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    showError('忘记密码功能暂未开放，请联系系统管理员');
  };

  // 输入框变化处理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 输入框焦点事件
  const handleInputFocus = () => {
    hideError();
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 left-20 w-32 h-32 bg-primary bg-opacity-10 rounded-full ${styles.floatingAnimation}`}></div>
        <div className={`absolute top-40 right-32 w-24 h-24 bg-secondary bg-opacity-10 rounded-full ${styles.floatingAnimation}`} style={{animationDelay: '-2s'}}></div>
        <div className={`absolute bottom-32 left-1/4 w-16 h-16 bg-accent bg-opacity-10 rounded-full ${styles.floatingAnimation}`} style={{animationDelay: '-4s'}}></div>
      </div>

      {/* 登录容器 */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        {/* 登录卡片 */}
        <div className="bg-cardBg rounded-2xl shadow-card p-8 w-full">
          {/* Logo和产品名称 */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className={`w-16 h-16 ${styles.gradientBg} rounded-2xl flex items-center justify-center`}>
                <i className="fas fa-book-open text-white text-2xl"></i>
              </div>
            </div>
            <h1 className={`text-2xl font-bold ${styles.textGradient} mb-2`}>扉页智汇</h1>
            <p className="text-textSecondary text-sm">管理员后台登录</p>
          </div>

          {/* 登录表单 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 用户名/邮箱输入框 */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-textPrimary">
                用户名/邮箱
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  ref={usernameInputRef}
                  value={formData.username}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className={`w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl ${styles.formInput} text-sm`}
                  placeholder="请输入用户名或邮箱"
                  required
                />
                <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-textMuted"></i>
              </div>
            </div>

            {/* 密码输入框 */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-textPrimary">
                密码
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  id="password" 
                  name="password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className={`w-full px-4 py-3 pl-12 pr-12 border border-gray-200 rounded-xl ${styles.formInput} text-sm`}
                  placeholder="请输入密码"
                  required
                />
                <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-textMuted"></i>
                <button 
                  type="button" 
                  onClick={handleTogglePassword}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-textMuted hover:text-primary"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* 错误提示 */}
            {showErrorMessage && (
              <div>
                <div className={`bg-red-50 border border-red-200 rounded-xl p-4 ${styles.errorMessage}`}>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-exclamation-circle text-red-500"></i>
                    <span className="text-red-700 text-sm">{errorText}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 忘记密码链接 */}
            <div className="text-right">
              <button 
                type="button" 
                onClick={handleForgotPassword}
                className="text-primary text-sm hover:text-accent transition-colors"
              >
                忘记密码？
              </button>
            </div>

            {/* 登录按钮 */}
            <button 
              type="submit" 
              disabled={isLoading}
              className={`${styles.loginButton} w-full py-3 ${styles.gradientBg} text-white rounded-xl font-medium shadow-card flex items-center justify-center space-x-2`}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>登录</span>
                  <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>
          </form>

          {/* 底部提示 */}
          <div className="text-center mt-8 pt-6 border-t border-gray-100">
            <p className="text-textMuted text-xs">
              没有账号？请联系系统管理员
            </p>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="text-center mt-8">
          <p className="text-textMuted text-xs">
            © 2024 扉页智汇. 保留所有权利.
          </p>
        </div>
      </div>

      {/* 加载遮罩 */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-cardBg rounded-2xl p-8 flex items-center space-x-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-textPrimary">登录中...</span>
          </div>
        </div>
      )}
    </div>
  );
}

