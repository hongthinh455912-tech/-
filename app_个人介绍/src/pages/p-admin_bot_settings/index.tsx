

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const BotSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 表单状态
  const [welcomeMessage, setWelcomeMessage] = useState('您好！我是张小明的智能助手，有什么可以帮助您的吗？');
  const [apiKey, setApiKey] = useState('sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  const [apiEndpoint, setApiEndpoint] = useState('https://api.openai.com/v1/chat/completions');
  const [enableAi, setEnableAi] = useState(true);
  
  // FAQ状态
  const [faqList, setFaqList] = useState<FaqItem[]>([
    {
      id: 'faq-1',
      question: '了解张小明的工作经历',
      answer: '张小明目前是字节跳动的高级UI设计师，拥有5年工作经验，曾在腾讯工作...'
    },
    {
      id: 'faq-2',
      question: '查看作品集',
      answer: '您可以点击页面上方的"作品集"导航菜单，或者直接访问作品集页面查看所有作品。'
    },
    {
      id: 'faq-3',
      question: '联系合作',
      answer: '您可以通过邮箱zhangxiaoming@example.com或微信zhangxm_design与我取得联系，讨论合作事宜。'
    }
  ]);
  
  // 模态框状态
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentEditingFaqId, setCurrentEditingFaqId] = useState<string | null>(null);
  const [faqFormQuestion, setFaqFormQuestion] = useState('');
  const [faqFormAnswer, setFaqFormAnswer] = useState('');
  const [faqCounter, setFaqCounter] = useState(3);
  
  // 成功提示状态
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('设置保存成功！');

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '机器人设置 - 扉页智汇管理后台';
    return () => { document.title = originalTitle; };
  }, []);

  // 处理退出登录
  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      navigate('/admin-login');
    }
  };

  // 处理表单提交
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('保存机器人设置:', {
      welcomeMessage,
      apiKey,
      apiEndpoint,
      enableAi
    });
    
    showSuccessToastMessage('设置保存成功！');
  };

  // 处理取消
  const handleCancel = () => {
    if (confirm('确定要取消修改吗？未保存的更改将丢失。')) {
      window.location.reload();
    }
  };

  // 打开FAQ模态框
  const openFaqModal = (title: string, faqId: string | null) => {
    setCurrentEditingFaqId(faqId);
    
    if (faqId) {
      const faqItem = faqList.find(item => item.id === faqId);
      if (faqItem) {
        setFaqFormQuestion(faqItem.question);
        setFaqFormAnswer(faqItem.answer);
      }
    } else {
      setFaqFormQuestion('');
      setFaqFormAnswer('');
    }
    
    setShowFaqModal(true);
  };

  // 关闭FAQ模态框
  const closeFaqModal = () => {
    setShowFaqModal(false);
    setCurrentEditingFaqId(null);
    setFaqFormQuestion('');
    setFaqFormAnswer('');
  };

  // 保存FAQ
  const saveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    
    const question = faqFormQuestion.trim();
    const answer = faqFormAnswer.trim();
    
    if (!question || !answer) {
      alert('请填写完整的问题和答案');
      return;
    }
    
    if (currentEditingFaqId) {
      // 编辑现有FAQ
      setFaqList(prevList => 
        prevList.map(item => 
          item.id === currentEditingFaqId 
            ? { ...item, question, answer }
            : item
        )
      );
    } else {
      // 新增FAQ
      const newFaqId = `faq-${faqCounter + 1}`;
      const newFaq: FaqItem = {
        id: newFaqId,
        question,
        answer
      };
      
      setFaqList(prevList => [...prevList, newFaq]);
      setFaqCounter(prev => prev + 1);
    }
    
    closeFaqModal();
    showSuccessToastMessage('FAQ保存成功！');
  };

  // 打开删除确认模态框
  const openDeleteModal = (faqId: string) => {
    setCurrentEditingFaqId(faqId);
    setShowDeleteModal(true);
  };

  // 关闭删除确认模态框
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentEditingFaqId(null);
  };

  // 确认删除
  const confirmDelete = () => {
    if (currentEditingFaqId) {
      setFaqList(prevList => 
        prevList.filter(item => item.id !== currentEditingFaqId)
      );
      closeDeleteModal();
      showSuccessToastMessage('FAQ删除成功！');
    }
  };

  // 显示成功提示
  const showSuccessToastMessage = (message: string = '设置保存成功！') => {
    setSuccessMessage(message);
    setShowSuccessToast(true);
    
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  // 处理模态框背景点击
  const handleModalBackdropClick = (e: React.MouseEvent, closeModal: () => void) => {
    if (e.target === e.currentTarget) {
      closeModal();
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
              <div className="w-8 h-8 bg-gradient rounded-lg flex items-center justify-center">
                <i className="fas fa-book-open text-white text-sm"></i>
              </div>
              <span className={`text-xl font-bold ${styles.textGradient}`}>扉页智汇管理后台</span>
            </div>
            
            {/* 管理员信息和退出登录 */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-white text-sm"></i>
                </div>
                <span className="text-sm text-textPrimary">管理员</span>
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
              className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:bg-gray-50 rounded-xl transition-colors"
            >
              <i className="fas fa-tachometer-alt w-5"></i>
              <span>管理首页</span>
            </Link>
            <Link 
              to="/admin-profile" 
              className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:bg-gray-50 rounded-xl transition-colors"
            >
              <i className="fas fa-user-edit w-5"></i>
              <span>个人信息</span>
            </Link>
            <Link 
              to="/admin-portfolio" 
              className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:bg-gray-50 rounded-xl transition-colors"
            >
              <i className="fas fa-folder-open w-5"></i>
              <span>作品集管理</span>
            </Link>
            <Link 
              to="/admin-contact" 
              className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:bg-gray-50 rounded-xl transition-colors"
            >
              <i className="fas fa-address-book w-5"></i>
              <span>联系方式管理</span>
            </Link>
            <Link 
              to="/admin-bot-settings" 
              className={`${styles.navLinkActive} flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors`}
            >
              <i className="fas fa-robot w-5"></i>
              <span>机器人设置</span>
            </Link>
            <Link 
              to="/admin-stats" 
              className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:bg-gray-50 rounded-xl transition-colors"
            >
              <i className="fas fa-chart-bar w-5"></i>
              <span>数据统计</span>
            </Link>
            <Link 
              to="/admin-page-settings" 
              className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:bg-gray-50 rounded-xl transition-colors"
            >
              <i className="fas fa-palette w-5"></i>
              <span>页面设置</span>
            </Link>
          </nav>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 ml-64 p-8">
          {/* 页面头部 */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-textPrimary">机器人设置</h1>
                <nav className="flex items-center space-x-2 text-sm text-textSecondary mt-2">
                  <Link to="/admin-dashboard" className="hover:text-primary transition-colors">管理首页</Link>
                  <i className="fas fa-chevron-right text-xs"></i>
                  <span>机器人设置</span>
                </nav>
              </div>
            </div>
          </div>

          {/* 配置表单 */}
          <form onSubmit={handleFormSubmit} className="space-y-8">
            {/* 欢迎语配置 */}
            <div className="bg-cardBg rounded-2xl shadow-card p-8">
              <h2 className="text-xl font-semibold text-textPrimary mb-6">欢迎语设置</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="welcome-message" className="block text-sm font-medium text-textPrimary mb-3">
                    机器人欢迎语
                  </label>
                  <textarea 
                    id="welcome-message" 
                    name="welcome-message" 
                    rows={4}
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-xl ${styles.formInput} resize-none`}
                    placeholder="您好！我是张小明的智能助手，有什么可以帮助您的吗？"
                  />
                  <p className="text-xs text-textMuted mt-2">
                    访客打开聊天窗口时显示的欢迎信息
                  </p>
                </div>
              </div>
            </div>

            {/* 常见问题配置 */}
            <div className="bg-cardBg rounded-2xl shadow-card p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-textPrimary">常见问题（FAQ）</h2>
                <button 
                  type="button" 
                  onClick={() => openFaqModal('新增常见问题', null)}
                  className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-opacity-90 transition-colors"
                >
                  <i className="fas fa-plus mr-2"></i>
                  添加问题
                </button>
              </div>
              
              <div className="space-y-4">
                {faqList.map((faq) => (
                  <div key={faq.id} className={`${styles.faqItem} p-4 border border-gray-100 rounded-xl hover:border-primary transition-colors`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-3">
                          <span className="text-sm font-medium text-textPrimary">问题：</span>
                          <span className="text-sm text-textSecondary">{faq.question}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-textPrimary">答案：</span>
                          <span className="text-sm text-textSecondary">{faq.answer}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button 
                          type="button" 
                          onClick={() => openFaqModal('编辑常见问题', faq.id)}
                          className="w-8 h-8 bg-secondary text-white rounded-lg flex items-center justify-center hover:bg-opacity-90 transition-colors"
                        >
                          <i className="fas fa-edit text-xs"></i>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => openDeleteModal(faq.id)}
                          className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-opacity-90 transition-colors"
                        >
                          <i className="fas fa-trash text-xs"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* API集成配置 */}
            <div className="bg-cardBg rounded-2xl shadow-card p-8">
              <h2 className="text-xl font-semibold text-textPrimary mb-6">API集成</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="api-key" className="block text-sm font-medium text-textPrimary mb-3">
                    API密钥
                  </label>
                  <input 
                    type="text" 
                    id="api-key" 
                    name="api-key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-xl ${styles.formInput}`}
                    placeholder="请输入API密钥"
                  />
                  <p className="text-xs text-textMuted mt-2">
                    第三方AI服务的API密钥，如ChatGPT、文心一言等
                  </p>
                </div>
                
                <div>
                  <label htmlFor="api-endpoint" className="block text-sm font-medium text-textPrimary mb-3">
                    API端点
                  </label>
                  <input 
                    type="url" 
                    id="api-endpoint" 
                    name="api-endpoint"
                    value={apiEndpoint}
                    onChange={(e) => setApiEndpoint(e.target.value)}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-xl ${styles.formInput}`}
                    placeholder="请输入API端点URL"
                  />
                  <p className="text-xs text-textMuted mt-2">
                    API服务的访问端点URL
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    id="enable-ai" 
                    name="enable-ai" 
                    checked={enableAi}
                    onChange={(e) => setEnableAi(e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="enable-ai" className="text-sm text-textPrimary">
                    启用第三方AI服务
                  </label>
                </div>
              </div>
            </div>

            {/* 保存按钮 */}
            <div className="flex justify-end space-x-4">
              <button 
                type="button" 
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-100 text-textSecondary rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button 
                type="submit" 
                className="px-8 py-3 bg-primary text-white rounded-xl font-medium shadow-card hover:shadow-card-hover transition-all"
              >
                <i className="fas fa-save mr-2"></i>
                保存设置
              </button>
            </div>
          </form>
        </main>
      </div>

      {/* 新增/编辑FAQ模态框 */}
      {showFaqModal && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center ${styles.modalBackdrop}`}
          onClick={(e) => handleModalBackdropClick(e, closeFaqModal)}
        >
          <div className={`bg-cardBg rounded-2xl shadow-card max-w-2xl w-full mx-4 ${styles.modalEnter}`}>
            <div className={`${styles.gradientBg} text-white p-6 rounded-t-2xl`}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {currentEditingFaqId ? '编辑常见问题' : '新增常见问题'}
                </h3>
                <button 
                  type="button" 
                  onClick={closeFaqModal}
                  className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
                >
                  <i className="fas fa-times text-sm"></i>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <form onSubmit={saveFaq} className="space-y-6">
                <div>
                  <label htmlFor="faq-question" className="block text-sm font-medium text-textPrimary mb-3">
                    问题 *
                  </label>
                  <input 
                    type="text" 
                    id="faq-question" 
                    name="question"
                    value={faqFormQuestion}
                    onChange={(e) => setFaqFormQuestion(e.target.value)}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-xl ${styles.formInput}`}
                    placeholder="请输入问题内容" 
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="faq-answer" className="block text-sm font-medium text-textPrimary mb-3">
                    答案 *
                  </label>
                  <textarea 
                    id="faq-answer" 
                    name="answer" 
                    rows={4}
                    value={faqFormAnswer}
                    onChange={(e) => setFaqFormAnswer(e.target.value)}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-xl ${styles.formInput} resize-none`}
                    placeholder="请输入答案内容" 
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button 
                    type="button" 
                    onClick={closeFaqModal}
                    className="px-6 py-2 bg-gray-100 text-textSecondary rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                  >
                    保存
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 删除确认模态框 */}
      {showDeleteModal && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center ${styles.modalBackdrop}`}
          onClick={(e) => handleModalBackdropClick(e, closeDeleteModal)}
        >
          <div className={`bg-cardBg rounded-2xl shadow-card max-w-md w-full mx-4 ${styles.modalEnter}`}>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-textPrimary mb-2">确认删除</h3>
              <p className="text-textSecondary mb-6">
                确定要删除这个常见问题吗？此操作无法撤销。
              </p>
              <div className="flex justify-center space-x-3">
                <button 
                  type="button" 
                  onClick={closeDeleteModal}
                  className="px-6 py-2 bg-gray-100 text-textSecondary rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  取消
                </button>
                <button 
                  type="button" 
                  onClick={confirmDelete}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                >
                  删除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 成功提示 */}
      {showSuccessToast && (
        <div className="fixed top-20 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-card">
          <div className="flex items-center space-x-2">
            <i className="fas fa-check-circle"></i>
            <span>{successMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotSettingsPage;

