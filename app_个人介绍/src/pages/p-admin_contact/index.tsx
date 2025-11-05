

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface Contact {
  id: string;
  type: string;
  display_text: string;
  value: string;
}

const AdminContactPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 状态管理
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      type: 'email',
      display_text: '邮箱',
      value: 'zhangxiaoming@example.com'
    },
    {
      id: '2',
      type: 'wechat',
      display_text: '微信',
      value: 'zhangxm_design'
    },
    {
      id: '3',
      type: 'github',
      display_text: 'GitHub',
      value: 'github.com/zhangxm'
    },
    {
      id: '4',
      type: 'linkedin',
      display_text: 'LinkedIn',
      value: 'linkedin.com/in/zhangxm'
    },
    {
      id: '5',
      type: 'phone',
      display_text: '电话',
      value: '138-0013-8000'
    },
    {
      id: '6',
      type: 'website',
      display_text: '个人网站',
      value: 'www.zhangxm.design'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // 表单状态
  const [contactFormData, setContactFormData] = useState({
    type: '',
    display_text: '',
    value: ''
  });

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '联系方式管理 - 扉页智汇';
    return () => { document.title = originalTitle; };
  }, []);

  // 获取联系方式类型标签
  const getContactTypeLabel = (type: string): string => {
    const typeMap: Record<string, string> = {
      'email': '邮箱',
      'phone': '电话',
      'wechat': '微信',
      'github': 'GitHub',
      'linkedin': 'LinkedIn',
      'website': '个人网站',
      'twitter': 'Twitter',
      'instagram': 'Instagram',
      'other': '其他'
    };
    return typeMap[type] || type;
  };

  // 获取筛选后的联系方式
  const getFilteredContacts = (): Contact[] => {
    let filtered = [...contacts];

    // 搜索筛选
    if (searchTerm) {
      filtered = filtered.filter(contact => 
        contact.display_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getContactTypeLabel(contact.type).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 排序
    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField as keyof Contact];
        let bValue = b[sortField as keyof Contact];
        
        if (sortField === 'type') {
          aValue = getContactTypeLabel(aValue as string);
          bValue = getContactTypeLabel(bValue as string);
        }

        if (sortOrder === 'asc') {
          return (aValue as string).localeCompare(bValue as string);
        } else {
          return (bValue as string).localeCompare(aValue as string);
        }
      });
    }

    return filtered;
  };

  // 分页逻辑
  const filteredContacts = getFilteredContacts();
  const totalCount = filteredContacts.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(currentPage * pageSize, totalCount);
  const pageContacts = filteredContacts.slice(startIndex, endIndex);

  // 处理搜索
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // 处理排序
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // 处理全选
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedContacts(new Set(pageContacts.map(contact => contact.id)));
    } else {
      setSelectedContacts(new Set());
    }
  };

  // 处理联系人选择
  const handleContactSelect = (contactId: string, checked: boolean) => {
    const newSelected = new Set(selectedContacts);
    if (checked) {
      newSelected.add(contactId);
    } else {
      newSelected.delete(contactId);
    }
    setSelectedContacts(newSelected);
  };

  // 处理分页
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 打开新增联系人模态框
  const handleAddContact = () => {
    setEditingContactId(null);
    setContactFormData({ type: '', display_text: '', value: '' });
    setShowContactModal(true);
  };

  // 打开编辑联系人模态框
  const handleEditContact = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      setEditingContactId(contactId);
      setContactFormData({
        type: contact.type,
        display_text: contact.display_text,
        value: contact.value
      });
      setShowContactModal(true);
    }
  };

  // 保存联系人
  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingContactId) {
      // 编辑现有联系人
      setContacts(prevContacts => 
        prevContacts.map(contact => 
          contact.id === editingContactId 
            ? { ...contact, ...contactFormData }
            : contact
        )
      );
      showToast('联系方式更新成功！');
    } else {
      // 新增联系人
      const newContact: Contact = {
        id: Date.now().toString(),
        ...contactFormData
      };
      setContacts(prevContacts => [...prevContacts, newContact]);
      showToast('联系方式添加成功！');
    }

    setShowContactModal(false);
    setContactFormData({ type: '', display_text: '', value: '' });
    setEditingContactId(null);
  };

  // 打开删除确认模态框
  const handleDeleteContact = (contactId: string) => {
    setEditingContactId(contactId);
    setShowDeleteModal(true);
  };

  // 确认删除
  const handleConfirmDelete = () => {
    if (editingContactId) {
      setContacts(prevContacts => 
        prevContacts.filter(contact => contact.id !== editingContactId)
      );
      setSelectedContacts(prev => {
        const newSelected = new Set(prev);
        newSelected.delete(editingContactId);
        return newSelected;
      });
      showToast('联系方式删除成功！');
    }
    setShowDeleteModal(false);
    setEditingContactId(null);
  };

  // 批量删除
  const handleBatchDelete = () => {
    if (selectedContacts.size > 0) {
      setContacts(prevContacts => 
        prevContacts.filter(contact => !selectedContacts.has(contact.id))
      );
      setSelectedContacts(new Set());
      showToast('批量删除成功！');
    }
  };

  // 退出登录
  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      navigate('/admin-login');
    }
  };

  // 显示提示信息
  const showToast = (message: string) => {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full';
    toast.innerHTML = `
      <div class="flex items-center space-x-2">
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // 显示提示
    setTimeout(() => {
      toast.classList.remove('translate-x-full');
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
      toast.classList.add('translate-x-full');
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  // 检查是否全选
  const isAllSelected = pageContacts.length > 0 && selectedContacts.size === pageContacts.length;
  const isIndeterminate = selectedContacts.size > 0 && selectedContacts.size < pageContacts.length;

  // 生成页码
  const generatePageNumbers = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
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
              <span className={`text-xl font-bold ${styles.textGradient}`}>扉页智汇</span>
            </div>
            
            {/* 管理员信息和退出登录 */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://s.coze.cn/image/-ijmsMcfK8g/" 
                  alt="管理员头像" 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm text-textPrimary">张小明</span>
              </div>
              <button onClick={handleLogout} className={styles.btnSecondary}>
                <i className="fas fa-sign-out-alt mr-2"></i>
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
              className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:text-primary hover:bg-tertiary rounded-xl transition-colors"
            >
              <i className="fas fa-tachometer-alt w-5"></i>
              <span>仪表盘</span>
            </Link>
            <Link 
              to="/admin-profile" 
              className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:text-primary hover:bg-tertiary rounded-xl transition-colors"
            >
              <i className="fas fa-user-edit w-5"></i>
              <span>个人信息</span>
            </Link>
            <Link 
              to="/admin-portfolio" 
              className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:text-primary hover:bg-tertiary rounded-xl transition-colors"
            >
              <i className="fas fa-folder-open w-5"></i>
              <span>作品集管理</span>
            </Link>
            <Link 
              to="/admin-contact" 
              className={`${styles.navLinkActive} flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors`}
            >
              <i className="fas fa-address-book w-5"></i>
              <span>联系方式管理</span>
            </Link>
            <Link 
              to="/admin-bot-settings" 
              className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:text-primary hover:bg-tertiary rounded-xl transition-colors"
            >
              <i className="fas fa-robot w-5"></i>
              <span>机器人设置</span>
            </Link>
            <Link 
              to="/admin-stats" 
              className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:text-primary hover:bg-tertiary rounded-xl transition-colors"
            >
              <i className="fas fa-chart-bar w-5"></i>
              <span>数据统计</span>
            </Link>
            <Link 
              to="/admin-page-settings" 
              className="flex items-center space-x-3 px-4 py-3 text-textSecondary hover:text-primary hover:bg-tertiary rounded-xl transition-colors"
            >
              <i className="fas fa-palette w-5"></i>
              <span>页面设置</span>
            </Link>
          </nav>
        </aside>

        {/* 内容区域 */}
        <div className="flex-1 ml-64 p-6">
          {/* 页面头部 */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-3xl font-bold text-textPrimary">联系方式管理</h1>
                <nav className="flex items-center space-x-2 text-sm text-textSecondary mt-2">
                  <Link to="/admin-dashboard" className="hover:text-primary">仪表盘</Link>
                  <i className="fas fa-chevron-right text-xs"></i>
                  <span>联系方式管理</span>
                </nav>
              </div>
              <button onClick={handleAddContact} className={styles.btnPrimary}>
                <i className="fas fa-plus mr-2"></i>
                新增联系方式
              </button>
            </div>
          </div>

          {/* 联系方式列表 */}
          <div className="bg-cardBg rounded-2xl shadow-card overflow-hidden">
            {/* 工具栏 */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={isAllSelected}
                      ref={(input) => {
                        if (input) input.indeterminate = isIndeterminate;
                      }}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label className="text-sm text-textSecondary">全选</label>
                  </div>
                  <button 
                    onClick={handleBatchDelete}
                    disabled={selectedContacts.size === 0}
                    className={`${styles.btnDanger} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <i className="fas fa-trash mr-2"></i>
                    批量删除
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="搜索联系方式..." 
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className={`w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl ${styles.searchInput} text-sm`}
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted text-sm"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* 表格 */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-textSecondary uppercase tracking-wider w-12">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-medium text-textSecondary uppercase tracking-wider cursor-pointer hover:text-primary"
                      onClick={() => handleSort('type')}
                    >
                      类型
                      <i className={`fas ${sortField === 'type' ? (sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'} ml-1`}></i>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-medium text-textSecondary uppercase tracking-wider cursor-pointer hover:text-primary"
                      onClick={() => handleSort('display_text')}
                    >
                      显示文本
                      <i className={`fas ${sortField === 'display_text' ? (sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'} ml-1`}></i>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                      值
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {pageContacts.map(contact => (
                    <tr key={contact.id} className={styles.tableRow}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          value={contact.id}
                          checked={selectedContacts.has(contact.id)}
                          onChange={(e) => handleContactSelect(contact.id, e.target.checked)}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-tertiary text-primary">
                          {getContactTypeLabel(contact.type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                        {contact.display_text}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-textSecondary">
                        {contact.value}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button 
                          onClick={() => handleEditContact(contact.id)}
                          className="text-primary hover:text-accent"
                        >
                          <i className="fas fa-edit mr-1"></i>编辑
                        </button>
                        <button 
                          onClick={() => handleDeleteContact(contact.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="fas fa-trash mr-1"></i>删除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 分页 */}
            <div className="p-6 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div className="text-sm text-textSecondary">
                  显示第 <span>{totalCount > 0 ? startIndex + 1 : 0}</span> - <span>{endIndex}</span> 条，共 <span>{totalCount}</span> 条记录
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className={`${styles.btnSecondary} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <div className="flex space-x-1">
                    {generatePageNumbers().map(page => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                          page === currentPage 
                            ? 'bg-primary text-white' 
                            : 'bg-white text-textSecondary hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className={`${styles.btnSecondary} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 新增/编辑联系方式模态框 */}
      {showContactModal && (
        <div className="fixed inset-0 z-50">
          <div className={styles.modalBackdrop} onClick={() => setShowContactModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-cardBg rounded-2xl shadow-card w-full max-w-md">
              {/* 模态框头部 */}
              <div className={`${styles.gradientBg} text-white p-6 rounded-t-2xl`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {editingContactId ? '编辑联系方式' : '新增联系方式'}
                  </h3>
                  <button 
                    onClick={() => setShowContactModal(false)}
                    className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
                  >
                    <i className="fas fa-times text-sm"></i>
                  </button>
                </div>
              </div>
              
              {/* 模态框内容 */}
              <div className="p-6">
                <form onSubmit={handleSaveContact} className="space-y-4">
                  <div>
                    <label htmlFor="contact-type" className="block text-sm font-medium text-textPrimary mb-2">
                      联系方式类型 *
                    </label>
                    <select 
                      id="contact-type" 
                      name="type" 
                      value={contactFormData.type}
                      onChange={(e) => setContactFormData(prev => ({ ...prev, type: e.target.value }))}
                      className={`w-full px-4 py-3 border border-gray-200 rounded-xl ${styles.searchInput}`}
                      required
                    >
                      <option value="">请选择类型</option>
                      <option value="email">邮箱</option>
                      <option value="phone">电话</option>
                      <option value="wechat">微信</option>
                      <option value="github">GitHub</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="website">个人网站</option>
                      <option value="twitter">Twitter</option>
                      <option value="instagram">Instagram</option>
                      <option value="other">其他</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="contact-display-text" className="block text-sm font-medium text-textPrimary mb-2">
                      显示文本 *
                    </label>
                    <input 
                      type="text" 
                      id="contact-display-text" 
                      name="display_text"
                      value={contactFormData.display_text}
                      onChange={(e) => setContactFormData(prev => ({ ...prev, display_text: e.target.value }))}
                      className={`w-full px-4 py-3 border border-gray-200 rounded-xl ${styles.searchInput}`}
                      placeholder="例如：我的邮箱、GitHub主页等" 
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contact-value" className="block text-sm font-medium text-textPrimary mb-2">
                      联系信息 *
                    </label>
                    <input 
                      type="text" 
                      id="contact-value" 
                      name="value"
                      value={contactFormData.value}
                      onChange={(e) => setContactFormData(prev => ({ ...prev, value: e.target.value }))}
                      className={`w-full px-4 py-3 border border-gray-200 rounded-xl ${styles.searchInput}`}
                      placeholder="请输入邮箱地址、链接或其他联系信息" 
                      required
                    />
                  </div>
                </form>
              </div>
              
              {/* 模态框底部 */}
              <div className="p-6 border-t border-gray-100">
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setShowContactModal(false)}
                    className={`flex-1 ${styles.btnSecondary}`}
                  >
                    取消
                  </button>
                  <button 
                    onClick={handleSaveContact}
                    className={`flex-1 ${styles.btnPrimary}`}
                  >
                    保存
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 删除确认模态框 */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50">
          <div className={styles.modalBackdrop} onClick={() => setShowDeleteModal(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-cardBg rounded-2xl shadow-card w-full max-w-sm">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-textPrimary mb-2">确认删除</h3>
                <p className="text-textSecondary mb-6">您确定要删除这个联系方式吗？此操作无法撤销。</p>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setShowDeleteModal(false)}
                    className={`flex-1 ${styles.btnSecondary}`}
                  >
                    取消
                  </button>
                  <button 
                    onClick={handleConfirmDelete}
                    className={`flex-1 ${styles.btnDanger}`}
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

export default AdminContactPage;

