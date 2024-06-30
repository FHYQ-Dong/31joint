/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.scss */ "./css/style.scss");
/* harmony import */ var _modules_MobileMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/MobileMenu */ "./src/modules/MobileMenu.js");
/* harmony import */ var _modules_siteSearch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/siteSearch */ "./src/modules/siteSearch.js");
/* harmony import */ var _modules_newPolicy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/newPolicy */ "./src/modules/newPolicy.js");
/* harmony import */ var _modules_backTop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/backTop */ "./src/modules/backTop.js");
/* harmony import */ var _modules_smartSearch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/smartSearch */ "./src/modules/smartSearch.js");
/* harmony import */ var _modules_Questiton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/Questiton */ "./src/modules/Questiton.js");
/* harmony import */ var _modules_newNotice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/newNotice */ "./src/modules/newNotice.js");
/* harmony import */ var _modules_viewingHistory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/viewingHistory */ "./src/modules/viewingHistory.js");


// Our modules / classes









// Instantiate a new object using our modules/classes
const mobileMenu = new _modules_MobileMenu__WEBPACK_IMPORTED_MODULE_1__["default"]();
const sitesearch = new _modules_siteSearch__WEBPACK_IMPORTED_MODULE_2__["default"]();
const newpolicy = new _modules_newPolicy__WEBPACK_IMPORTED_MODULE_3__["default"]();
const backtotop = new _modules_backTop__WEBPACK_IMPORTED_MODULE_4__["default"]();
const smartsearch = new _modules_smartSearch__WEBPACK_IMPORTED_MODULE_5__["default"]();
const question = new _modules_Questiton__WEBPACK_IMPORTED_MODULE_6__["default"]();
const newnotice = new _modules_newNotice__WEBPACK_IMPORTED_MODULE_7__["default"]();
const viewinghistory = new _modules_viewingHistory__WEBPACK_IMPORTED_MODULE_8__["default"]();

/***/ }),

/***/ "./src/modules/MobileMenu.js":
/*!***********************************!*\
  !*** ./src/modules/MobileMenu.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class MobileMenu {
  constructor() {
    this.menu = document.querySelector(".site-header__menu");
    this.openButton = document.querySelector(".site-header__menu-trigger");
    this.events();
  }
  events() {
    this.openButton.addEventListener("click", () => this.openMenu());
  }
  openMenu() {
    this.openButton.classList.toggle("fa-bars");
    this.openButton.classList.toggle("fa-window-close");
    this.menu.classList.toggle("site-header__menu--active");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MobileMenu);

/***/ }),

/***/ "./src/modules/Questiton.js":
/*!**********************************!*\
  !*** ./src/modules/Questiton.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class Question {
  constructor() {
    this.events();
  }
  events() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.delete-question').on('click', this.deleteQuestion.bind(this));
    this.highlightMyQuestion();
    this.replaceQuestionsContent();
  }
  //替换字符以及给a标签增加新标签页
  replaceQuestionsContent() {
    var question_content = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.generic-content').html();
    // 创建一个临时的div来容纳HTML  
    var tempDiv = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div>').html(question_content);
    // 检查是否存在.question-answer类  
    var questionFlag = tempDiv.find('.question-answer').length > 0;
    if (questionFlag) {
      // 在.question-answer类下的a标签上操作  
      tempDiv.find('.question-answer a').each(function () {
        // 替换&amp;为&  
        var href = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('href').replace(/&amp;/g, '&');
        console.log(href);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('href', href);
        // 添加target="_blank"（如果还没有的话）  
        if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('target') || jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('target') !== '_blank') {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('target', '_blank');
        }
      });
      // 将修改后的div转回为字符串（如果需要的话）  
      var modifiedString = tempDiv.html();
      //console.log(modifiedString);  
      // 把修改后的内容放回原处，可以使用：  
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.generic-content').html(modifiedString);
    }
  }
  highlightMyQuestion() {
    //console.log(univ_data.current_user);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.question-title').each(function () {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('author') == univ_data.current_user) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('question-title-highlight');
      }
    });
  }
  deleteQuestion(e) {
    var thisQuestion = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parents("li");
    //删除wordpress中policy post的请求
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
      },
      url: univ_data.root_url + '/wp-json/wp/v2/question/' + thisQuestion.data('id'),
      type: 'DELETE',
      success: response => {
        thisQuestion.slideUp();
        console.log('congrats');
        console.log(response);
      },
      error: response => {
        console.log('sorry');
        console.log(response);
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Question);

/***/ }),

/***/ "./src/modules/backTop.js":
/*!********************************!*\
  !*** ./src/modules/backTop.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


//回到最顶部的按钮
class BackToTop {
  constructor() {
    this.mybutton = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".backTop");
    this.events();
  }
  events() {
    this.mybutton.on('click', this.backtotop_click.bind(this));
    // 当用户向下滚动20px时显示按钮，向上滚动时隐藏按钮  
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scroll(function () {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).scrollTop() > 20) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#backToTopBtn').fadeIn();
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#backToTopBtn').fadeOut();
      }
    });
  }
  backtotop_click() {
    console.log('clicked');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body,html').animate({
      scrollTop: 0
    }, 500); // 800是滚动动画的持续时间，单位是毫秒  
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BackToTop);

/***/ }),

/***/ "./src/modules/newNotice.js":
/*!**********************************!*\
  !*** ./src/modules/newNotice.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


//获取文件名
function getFileNameWithoutExtension(filePath) {
  // 使用最后一个'.'作为分隔符来分割字符串  
  const parts = filePath.split('.');
  // 获取除了最后一个部分（即扩展名）之外的所有部分，并使用'.'连接它们（如果有的话）  
  const fileNameWithoutExtension = parts.slice(0, -1).join('.');
  return fileNameWithoutExtension;
}
//获取文件后缀
function getFileExtension(filePath) {
  // 使用lastIndexOf找到最后一个'.'的位置  
  const lastIndex = filePath.lastIndexOf('.');
  // 如果找到了'.'，则返回从该'.'到字符串末尾的所有字符  
  if (lastIndex !== -1) {
    return filePath.slice(lastIndex + 1); // 使用slice方法，从lastIndex+1开始到字符串末尾  
  }
}
class NewNotice {
  constructor() {
    this.fileNames = []; // 将 fileNames 设置为类的属性 
    this.events();
    this.notice_type = 'none';
  }
  events() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("#current_notice").on('click', '.delete-notice', this.deleteNotice.bind(this));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.new-notice').on('change', this.checkFiles.bind(this));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".submit-notice").on('click', this.submitNotice.bind(this));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.showFiles').on('click', this.showFiles);
    this.getText();
  }
  getText() {
    //获取archive-notice页面上所有notice
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.notice-unit').each(function () {
      //获取是否已提取文本的flag
      var got_content = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('content');
      //若为零，则未提取并继续
      if (!got_content) {
        //获取文件所在路径
        var urlString = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('file');
        //通过正则来后去需要的那部分的路径
        // 使用正则表达式匹配从'wp-content'开始之后的所有内容              
        var regex = /wp-content\/(.*?\.[a-zA-Z]{2,4})/;
        var match = urlString.match(regex);
        if (match && match.length > 1) {
          var contentPath = match[1]; // 匹配到的第一个捕获组  
        } else {
          console.log('No match found.');
        }
        //提取文本的接口，合成url
        let answer_url = 'http://101.42.183.176:51115/get_text/?filepath=/www/wwwroot/101.42.183.176/wp-content/' + contentPath;
        console.log(answer_url);
        //从html中提取notice的id
        let post_id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('id');
        //向提取文本的接口发送请求
        jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
          beforeSend: xhr => {
            xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
          },
          url: answer_url,
          type: 'GET',
          // 请求类型：GET  
          dataType: 'json',
          // 期望的返回数据类型  
          success: response => {
            //console.log(response);
            //请求成功后，将得到的文本通过action在php端更新notice
            jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
              beforeSend: xhr => {
                xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
              },
              url: univ_data.ajaxurl,
              data: {
                'action': 'getTextForUpdate',
                'file_text': response.text,
                // 要传递的数据  
                'post_id': post_id
              },
              type: 'POST',
              success: response2 => {
                //console.log(response2);
                //更新成功后取消flag
                jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
                  beforeSend: xhr => {
                    xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
                  },
                  url: univ_data.ajaxurl,
                  data: {
                    'action': 'already_got_content_post',
                    'post_id': post_id
                  },
                  type: 'POST',
                  success: response3 => {
                    //console.log(response3);
                  },
                  error: response3 => {
                    console.log(response3);
                  }
                });
              },
              error: response2 => {
                console.log(response2);
              }
            });
          },
          error: response => {
            console.log(response);
          }
        });
      }
    });
  }
  showFiles() {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('show-workInjure')) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.file-list-workInjure').toggleClass('visible');
    }
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('show-basicMed')) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.file-list-basicMed').toggleClass('visible');
    }
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('show-outServiceSpecial')) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.file-list-outServiceSpecial').toggleClass('visible');
    }
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('show-birth')) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.file-list-birth').toggleClass('visible');
    }
  }

  //检查选择文件数是否超过12
  checkFiles(e) {
    var input = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.new-notice')[0]; // 使用 [0] 或 .get(0) 来获取 DOM 元素  
    var files = input.files;
    var maxFiles = 12;
    if (files.length > maxFiles) {
      alert('您最多只能选择' + maxFiles + '个文件:请重新选择文件。');
      // 清除当前选择，以便用户重新选择  
      input.value = '';
      input.value = null;
      // 注意：在某些浏览器中，直接设置 input.value = '' 可能不起作用  
      // 一种替代方法是使用 input.value = null（但并非所有浏览器都支持）  
    } else {
      this.fileNames = []; // 清空之前的文件名  
      var files = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).prop('files');
      for (var i = 0; i < files.length; i++) {
        this.fileNames.push(files[i].name);
      }
      console.log(this.fileNames); // 控制台输出  
    }
  }

  //提交文件
  async submitNotice() {
    this.notice_type = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#notice-type-select').val();
    for (let i = 0; i < this.fileNames.length; i++) {
      var exist_notice = false;
      //正则提取文字的标题
      var raw_title = this.fileNames[i];
      //提取文件后缀e.g. docx/pdf
      var suffix = getFileExtension(raw_title);
      //去除文件名后缀
      var clear_title = getFileNameWithoutExtension(raw_title);
      //查重
      for (let k = 0; k < univ_data.policies.length; k++) {
        if (clear_title == univ_data.notices[k]) {
          exist_notice = true;
        }
      }
      if (exist_notice) {
        alert("您上传的文件已存在:" + this.fileNames[i]);
        continue;
      }
      if (!exist_notice) {
        var newFile = {
          'title': clear_title,
          'excerpt': suffix,
          'content': '',
          'status': 'publish'
        };
        //发布notice post
        jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
          beforeSend: xhr => {
            xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
          },
          url: univ_data.root_url + '/wp-json/wp/v2/notice/',
          data: newFile,
          type: 'POST',
          success: response => {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(".notice-limit-message").addClass("active");
            jquery__WEBPACK_IMPORTED_MODULE_0___default()("#upload-notice-btn").removeClass("upload-notice-hide");
            jquery__WEBPACK_IMPORTED_MODULE_0___default()("#submit-notice-btn").addClass("upload-notice-hide");
            //初始化notice-type,顺便初始化got_content
            jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
              beforeSend: xhr => {
                xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
              },
              type: 'POST',
              url: univ_data.ajaxurl,
              // WordPress的AJAX处理URL  
              data: {
                //ajax action 钩子->传到php调用相应action的函数
                'action': 'initiate_notice_type',
                //传递id
                'notice_id': response.id,
                'notice_type': this.notice_type
              },
              success: metaresponse => {
                //console.log(metaresponse);  
              },
              error: error => {
                // 处理AJAX请求错误  
                console.log(error);
              }
            });
          },
          error: response => {
            console.log(response);
          }
        });
      }
    }
  }

  //delete
  deleteNotice(e) {
    var thisNotice = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parents("li");
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
      },
      url: univ_data.root_url + '/wp-json/wp/v2/notice/' + thisNotice.data('id'),
      type: 'DELETE',
      success: response => {
        thisNotice.slideUp();
        //console.log('congrats');
        //console.log(response);
      },
      error: response => {
        console.log('sorry');
        console.log(response);
      }
    });
    //删除上传的文档的请求
    var delete_url_no_suffix = thisNotice.data('delete_url');
    var delete_url = delete_url_no_suffix + thisNotice.data('suffix');
    //console.log(delete_url);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
      },
      type: 'POST',
      url: univ_data.ajaxurl,
      // WordPress的AJAX处理URL  
      data: {
        'action': 'delete_notice',
        // 自定义的action名称:文心一言牛逼！！！
        'file_path': delete_url // 要传递的数据  
      },
      success: function (response) {
        // 处理服务器响应  
        console.log(response);
        if (response.success) {
          //alert('文件已成功删除！');  
        } else {
          alert('删除文件时发生错误：' + response.data);
        }
      },
      error: function (error) {
        // 处理AJAX请求错误  
        console.log(error);
      }
    });
  }
  submit_form(e) {
    console.log('#notice-submit-form');
    var formData = new FormData();
    var fileInput = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.new-notice')[0];
    if (fileInput.files.length > 0) {
      // 添加文件到FormData  
      for (let i = 0; i < fileInput.files.length; i++) {
        formData.append('upload-notice', fileInput.files[i]);
      }
    }
    formData.append('action', 'uploadNewNotices');
    console.log(formData);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
      },
      type: 'POST',
      url: univ_data.ajaxurl,
      // WordPress的AJAX处理URL  
      data: formData,
      processData: false,
      // 告诉jQuery不要去处理发送的数据  
      success: function (res) {
        // 处理服务器响应  
        console.log(111);
        console.log(res);
      },
      error: function (error) {
        // 处理AJAX请求错误  
        console.log(222);
        console.log(error);
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NewNotice);

/***/ }),

/***/ "./src/modules/newPolicy.js":
/*!**********************************!*\
  !*** ./src/modules/newPolicy.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


//获取文件名
function getFileNameWithoutExtension(filePath) {
  // 使用最后一个'.'作为分隔符来分割字符串  
  const parts = filePath.split('.');
  // 获取除了最后一个部分（即扩展名）之外的所有部分，并使用'.'连接它们（如果有的话）  
  const fileNameWithoutExtension = parts.slice(0, -1).join('.');
  return fileNameWithoutExtension;
}
//获取文件后缀
function getFileExtension(filePath) {
  // 使用lastIndexOf找到最后一个'.'的位置  
  const lastIndex = filePath.lastIndexOf('.');
  // 如果找到了'.'，则返回从该'.'到字符串末尾的所有字符  
  if (lastIndex !== -1) {
    return filePath.slice(lastIndex + 1); // 使用slice方法，从lastIndex+1开始到字符串末尾  
  }
}
class NewPolicy {
  constructor() {
    this.fileNames = []; // 将 fileNames 设置为类的属性 
    this.events();
  }
  events() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("#current_policy").on('click', '.delete-policy', this.deletePolicy.bind(this));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.new-file').on('change', this.checkFiles.bind(this));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".submit-note").on('click', this.submitPolicy.bind(this));
    this.getText();
  }
  //获取pdf/docx文件内容
  getText() {
    //获取archive-policy页面上所有policy
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.policy-unit').each(function () {
      // 在这里，'this' 指的是当前遍历到的 .policy-unit DOM 元素  
      //获取是否已提取文本的flag
      var got_content = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('content');
      //若为零，则未提取并继续
      if (!got_content) {
        //获取文件所在路径
        var urlString = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('file');
        //通过正则来后去需要的那部分的路径
        // 使用正则表达式匹配从'wp-content'开始之后的所有内容              
        var regex = /wp-content\/(.*?\.[a-zA-Z]{2,4})/;
        var match = urlString.match(regex);
        if (match && match.length > 1) {
          var contentPath = match[1]; // 匹配到的第一个捕获组  
        } else {
          console.log('No match found.');
        }
        //提取文本的接口，合成url
        let answer_url = 'http://101.42.183.176:51115/get_text/?filepath=/www/wwwroot/101.42.183.176/wp-content/' + contentPath;
        //从html中提取policy的id
        let post_id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('id');
        //向提取文本的接口发送请求
        jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
          beforeSend: xhr => {
            xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
          },
          url: answer_url,
          type: 'GET',
          // 请求类型：GET  
          dataType: 'json',
          // 期望的返回数据类型  
          success: response => {
            //console.log(response);
            //请求成功后，将得到的文本通过action在php端更新policy
            jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
              beforeSend: xhr => {
                xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
              },
              url: univ_data.ajaxurl,
              data: {
                'action': 'getTextForUpdate',
                'file_text': response.text,
                // 要传递的数据  
                'post_id': post_id
              },
              type: 'POST',
              success: response2 => {
                //console.log(response2);
                //更新成功后取消flag
                jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
                  beforeSend: xhr => {
                    xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
                  },
                  url: univ_data.ajaxurl,
                  data: {
                    'action': 'already_got_content_post',
                    'post_id': post_id
                  },
                  type: 'POST',
                  success: response3 => {
                    //console.log(response3);
                  },
                  error: response3 => {
                    console.log(response3);
                  }
                });
              },
              error: response2 => {
                console.log(response2);
              }
            });
          },
          error: response => {
            console.log(response);
          }
        });
      }
    });
  }

  //检查选择文件数是否超过12
  checkFiles(e) {
    //window.alert(123);
    var input = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.new-file')[0]; // 使用 [0] 或 .get(0) 来获取 DOM 元素  
    var files = input.files;
    var maxFiles = 12;
    if (files.length > maxFiles) {
      alert('您最多只能选择' + maxFiles + '个文件:请重新选择文件。');
      // 清除当前选择，以便用户重新选择  
      input.value = '';
      input.value = null;
      // 注意：在某些浏览器中，直接设置 input.value = '' 可能不起作用  
      // 一种替代方法是使用 input.value = null（但并非所有浏览器都支持）  
    } else {
      this.fileNames = []; // 清空之前的文件名  
      var files = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).prop('files');
      for (var i = 0; i < files.length; i++) {
        this.fileNames.push(files[i].name);
      }
      //console.log(this.fileNames); // 控制台输出  
    }
  }

  //提交文件
  async submitPolicy() {
    for (let i = 0; i < this.fileNames.length; i++) {
      //判断当前文件policy的post是否存在的flag
      var exist_policy = false;
      //正则提取文字的标题
      var raw_title = this.fileNames[i];
      //提取文件后缀e.g. docx/pdf
      var suffix = getFileExtension(raw_title);
      //去除文件名后缀
      var clear_title = getFileNameWithoutExtension(raw_title);
      //查重
      for (let k = 0; k < univ_data.policies.length; k++) {
        if (clear_title == univ_data.policies[k]) {
          exist_policy = true;
        }
      }
      if (exist_policy) {
        alert("您上传的文件已存在:" + this.fileNames[i]);
        continue;
      }
      if (!exist_policy) {
        var newFile = {
          'title': clear_title,
          'excerpt': suffix,
          'content': '',
          'status': 'publish'
        };
        jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
          beforeSend: xhr => {
            xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
          },
          url: univ_data.root_url + '/wp-json/wp/v2/policy/',
          data: newFile,
          type: 'POST',
          success: response => {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(".note-limit-message").addClass("active");
            jquery__WEBPACK_IMPORTED_MODULE_0___default()("#upload-policy-btn").removeClass("upload-policy-hide");
            jquery__WEBPACK_IMPORTED_MODULE_0___default()("#submit-policy-btn").addClass("upload-policy-hide");
            //发布后更新post令got_content的flag生效
            jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
              beforeSend: xhr => {
                xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
              },
              url: univ_data.ajaxurl,
              data: {
                'action': 'initiate_policy',
                'policy_id': response.id
              },
              type: 'POST',
              success: response2 => {
                //console.log(response2);
              },
              error: response2 => {
                console.log(response2);
              }
            });
          },
          error: response => {
            console.log("error");
            console.log(response);
          }
        });
      }
    }
  }

  //delete
  deletePolicy(e) {
    var thisPolicy = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parents("li");
    //删除wordpress中policy post的请求
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
      },
      url: univ_data.root_url + '/wp-json/wp/v2/policy/' + thisPolicy.data('id'),
      type: 'DELETE',
      success: response => {
        thisPolicy.slideUp();
      },
      error: response => {
        console.log('sorry');
        console.log(response);
      }
    });
    //删除上传的文档的请求
    var delete_url_no_suffix = thisPolicy.data('delete_url');
    var delete_url = delete_url_no_suffix + thisPolicy.data('suffix');
    //console.log(delete_url);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
      },
      type: 'POST',
      url: univ_data.ajaxurl,
      // WordPress的AJAX处理URL  
      data: {
        'action': 'delete_file',
        'file_path': delete_url // 要传递的数据  
      },
      success: function (response) {
        // 处理服务器响应  
        console.log(response);
        if (response.success) {
          //alert('文件已成功删除！');  
        } else {
          alert('删除文件时发生错误：' + response.data);
        }
      },
      error: function (error) {
        // 处理AJAX请求错误  
        console.log(error);
      }
    });
  }
  submit_form(e) {
    console.log('#policy-submit-form');
    //e.preventDefault();  
    //console.log('#policy-submit-form');
    var formData = new FormData();
    var fileInput = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.new-file')[0];
    if (fileInput.files.length > 0) {
      // 添加文件到FormData  
      for (let i = 0; i < fileInput.files.length; i++) {
        formData.append('upload-policy', fileInput.files[i]);
      }
    }
    formData.append('action', 'uploadNewPolicies');
    console.log(formData);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
      },
      type: 'POST',
      url: univ_data.ajaxurl,
      // WordPress的AJAX处理URL  
      data: formData,
      processData: false,
      // 告诉jQuery不要去处理发送的数据  
      success: function (res) {
        // 处理服务器响应  
        console.log(res);
      },
      error: function (error) {
        // 处理AJAX请求错误  
        console.log(error);
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NewPolicy);

/***/ }),

/***/ "./src/modules/siteSearch.js":
/*!***********************************!*\
  !*** ./src/modules/siteSearch.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class siteSearch {
  //constructor中的代码在创建对象时会立刻执行
  constructor() {
    this.addSearchHtml();
    this.openBtn = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#site-search"); //指向搜索按钮class
    this.closeBtn = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".search-overlay__close"); //获取关闭搜索按钮class
    this.searchOverlay = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".search-overlay"); //class用.来获取
    this.searchField = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#search-item'); //id用#来获取
    this.events();
    this.searchState = false; //搜索状态
    this.typingTimer; //搜索计时器
    this.resultsDiv = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#search-overlay__results'); //搜索结果
    this.spinnerState = false; //搜索等待图标状态
    this.previousValue;
  }
  //2.events
  events() {
    this.openBtn.on('click', this.openOverlay.bind(this));
    this.closeBtn.on('click', this.closeOverlay.bind(this));
    //keyup只在放开按键时触发，keydown按下后不松开就一直触发
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('keyup', this.keyPressDispathcer.bind(this));
    //keydown的时间太短，searchfield来不及更新状态
    //所以要用keyup
    this.searchField.on('keyup', this.typingLogic.bind(this));
    //若正在只能搜索：禁用站内搜索
  }
  //3.functions   
  typingLogic() {
    if (this.searchField.val() != this.previousValue) {
      //每次按键按下都会触发函数
      //需要重置计时器
      clearTimeout(this.typingTimer);
      if (this.searchField.val()) {
        //输入框有内容才继续
        if (!this.spinnerState) {
          this.resultsDiv.html('<div class="spinner-loader"></div>');
          this.spinnerState = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 500);
      } else {
        //若输入框为空，就打印空结果，置零等待图标
        this.resultsDiv.html('');
        this.spinnerState = false;
      }
    }
    this.previousValue = this.searchField.val();
  }
  //搜索请求
  getResults() {
    const searchTerm = this.searchField.val(); // 获取搜索词
    //若用户搜索了某个键对应的数组中的任何一个元素
    //则查询该数组的所有内容并显示
    const replaceTerms = {
      '城乡居民基本医疗保险': ['城乡居民基本医疗保险', '城乡居民', '一老一小', '学生', '儿童', '婴幼儿', '老年人', '劳动年龄内居民'],
      '门诊特殊病': ['门诊特殊病', '门特病', '特殊病', '门诊特病', '恶性肿瘤', '肿瘤', '癌症', '透析', '肾透析', '移植', '抗排异']
    };
    let combinedResults = {
      notices: [],
      policies: [],
      questions: []
    }; // 初始化结果对象
    let ajaxRequests = []; // 存储 AJAX 请求的数组
    let groupNames = {}; // 存储组名的对象
    // 遍历 replaceTerms 对象，先遍历键值
    for (const groupName in replaceTerms) {
      //获取键值对应的近义词数组
      const synonyms = replaceTerms[groupName];
      // 遍历第二层数组（同义词数组）
      synonyms.forEach(synonym => {
        // 如果搜索词匹配到同义词
        if (searchTerm === synonym) {
          groupNames[synonym] = groupName; // 存储同义词与组名的对应关系
        }
      });
    }
    // 检查搜索词是否在替换列表中
    if (searchTerm in groupNames) {
      const groupName = groupNames[searchTerm];
      replaceTerms[groupName].forEach(replaceTerm => {
        // 发送 AJAX 请求搜索结果
        const request = jquery__WEBPACK_IMPORTED_MODULE_0___default().getJSON(univ_data.root_url + '/wp-json/univ/v1/search?term=' + replaceTerm, results => {
          // 将搜索结果合并到总结果对象中
          this.mergeResults(combinedResults, results);
        });
        ajaxRequests.push(request); // 将请求存储到数组中
      });
    } else {
      // 如果不在列表中，则直接按原搜索词进行搜索
      const request = jquery__WEBPACK_IMPORTED_MODULE_0___default().getJSON(univ_data.root_url + '/wp-json/univ/v1/search?term=' + searchTerm, results => {
        // 将搜索结果合并到总结果对象中
        this.mergeResults(combinedResults, results);
      });
      ajaxRequests.push(request); // 将请求存储到数组中
    }

    // 当请求完成时
    jquery__WEBPACK_IMPORTED_MODULE_0___default().when(...ajaxRequests).done(() => {
      // 更新搜索结果显示
      this.displayResults(combinedResults);
      this.spinnerState = false;
    });
  }
  //合并搜索结果并进行查重
  mergeResults(combinedResults, newResults) {
    // 辅助函数：检查是否已存在某条结果
    function isResultExists(resultsArray, result) {
      return resultsArray.some(existingResult => existingResult.id === result.id); // 假设每个结果对象有一个唯一的 id
    }
    // 合并 notices
    newResults.notices.forEach(notice => {
      if (!isResultExists(combinedResults.notices, notice)) {
        combinedResults.notices.push(notice);
      }
    });
    // 合并 policies
    newResults.policies.forEach(policy => {
      if (!isResultExists(combinedResults.policies, policy)) {
        combinedResults.policies.push(policy);
      }
    });

    // 合并 questions
    newResults.questions.forEach(question => {
      if (!isResultExists(combinedResults.questions, question)) {
        combinedResults.questions.push(question);
      }
    });
  }
  //显示搜索结果
  displayResults(results) {
    this.resultsDiv.html(`
            <div class="row">  
                <div class="one-third">
                    <h2 class="search-overlay__section-title">报销须知</h2>
                    ${results.notices.length ? '<ul class="link-list min-list">' : `<p>无匹配须知。<a target="_blank" href="${univ_data.root_url}/Notices">查看所有须知</a></p>`}
                    ${results.notices.map(item => `<li><a href="${item.permalink}" target="_blank">${item.title}</a></li>`)}  
                    ${results.notices.length ? `</ul>` : ``}                       
                </div>    
                <div class="one-third">
                    <h2 class="search-overlay__section-title">相关政策</h2>
                    ${results.policies.length ? '<ul class="link-list min-list">' : `<p>无匹配政策。<a target="_blank" href="${univ_data.root_url}/Policies">查看所有政策</a></p>`}
                    ${results.policies.map(item => `<li><a href="${item.permalink}" target="_blank">${item.title}</a></li>`)}
                    ${results.policies.length ? '</ul>' : ''}         
                </div>      
                <div class="one-third">
                    <h2 class="search-overlay__section-title">热门问题</h2>
                    ${results.questions.length ? '<ul class="link-list min-list">' : `<p>无匹配问题。<a target="_blank" href="${univ_data.root_url}/Questions">查看所有热门问题</a></p>`}
                    ${results.questions.map(item => `<li><a href="${item.permalink}" target="_blank">${item.title.replace(/:.*/, '')}</a></li>`)}
                    ${results.questions.length ? '</ul>' : ''}         
                </div>                          
            </div>
        `);
  }
  keyPressDispathcer(e) {
    //!$('input, textarea').is(':focus') 当前没有打开任何输入框
    //按s键打开站内搜索框
    //if(e.keyCode==83&&this.searchState==false&&!$('input, textarea').is(':focus')){
    //this.openOverlay();
    //}
    if (e.keyCode == 27 && this.searchState == true) {
      this.closeOverlay();
    }
  }
  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').addClass('body-no-scroll');
    this.searchField.val('');
    setTimeout(() => this.searchField.focus(), 301);
    this.searchState = true;
    return false;
  }
  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').removeClass('body-no-scroll');
    this.searchState = false;
  }
  //搜索页面的样式
  addSearchHtml() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').append(`
        <div class="search-overlay">
            <div class="search-overlay__top">
                <div class="container">
                    <div class="search-overlay__container">
                        <i class="gg-search search-overlay__icon" aria-hidden="true"></i>
                        <input type="text" class="search-term" placeholder="您想问什么?" id="search-item">                    
                    </div>
                    <i class="gg-close-o search-overlay__close search-overlay__gg-close-o" aria-hidden="true"></i>
                </div>
            </div>
            <div class="container">
            <div id="search-overlay__results"></div>
            </div>
        </div>
        `);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (siteSearch);

/***/ }),

/***/ "./src/modules/smartSearch.js":
/*!************************************!*\
  !*** ./src/modules/smartSearch.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class smartSearch {
  //1.describe object
  //constructor中的代码在创建对象时会立刻执行
  constructor() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).ready(() => {
      this.openBtn = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#smart-search"); // 指向搜索按钮的class（注意这里应该是.class而不是#id）  
      this.searchField = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#smart-search-item'); // id 用#来获取  
      this.submitBtn = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.smart-search-submit');
      this.status = 'none'; // 初始化状态  
      this.ans_id = null; // 初始化答案ID  
      this.events();
      this.searched_question = ''; //AI搜索问题
      this.answer = ''; //AI搜索答案
      this.interval_time = 2500;
      this.hrefs; //搜索时禁止a标签href，储存删除的href
      //两个计时器要在ajax结束时清除
      this.intervalId;
      this.intervalId3;
    });
  }

  //2.events
  events() {
    //检测用户聚焦搜索框，并检测回车键
    this.searchField.on('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault(); // 阻止默认的回车事件，避免表单提交
        this.submitBtn.trigger('click'); // 模拟点击提交按钮
      }
    });
    this.submitBtn.on('click', this.askAI.bind(this));
    //登录后 隐藏智能搜素提示 显示智能搜索框
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.login-notice').data('user') != 0) {
      //console.log($('.login-notice').data('user'));
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.login-notice').addClass('login-notice-hide');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.search-form').removeClass('search-form-hide');
    }
  }
  //3.functions   
  //进度条函数
  progressBar(status) {
    if (status == 'none') {
      currentValue = 0;
    }
    var progress_bar = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.search-progress'); // 假设这是一个 <progress> 元素  
    var currentValue = parseInt(progress_bar.attr('value')); // 获取当前值，如果未设置则默认为0  
    if (status == 'Processing' && currentValue <= 85) {
      this.intervalId = setInterval(() => {
        if (currentValue >= 85) {
          clearInterval(this.intervalId); // 当达到或超过76时，停止增加  
        } else {
          currentValue++; // 或者，如果你使用百分比，可以这样做：currentValue += (100 / 76);  
          progress_bar.attr('value', currentValue.toString()); // 更新进度条的值  
        }
      }, 175); // 每0.175秒更新一次              
    } else if (status == 'Success') {
      clearInterval(this.intervalId); // 当达到或超过76时，停止增加  
      status = 'Success';
      currentValue = 100; // 设置当前值为100  
      progress_bar.attr('value', currentValue.toString()); // 更新进度条的值  
    }
  }

  //搜索时禁用的设置
  noRedirect() {
    this.ans_id = null;
    this.status = 'none';
    this.answer = '';
    //隐藏站内搜索框
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#site-search').addClass('site-search-hide');
    //搜索时显示不要跳转页面的警告
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.search-alert').removeClass('search-alert-hide');
    //隐藏搜索按钮
    this.submitBtn.addClass('submit-hide');
    //禁止输入框行为：输入
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.s').prop('disabled', true);
    let self = this; // 使用外部变量来保存外部 this 的引用  
    // 搜索时保存主页所有a标签的href属性  
    self.hrefs = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.home a').map(function () {
      // 使用普通函数而不是箭头函数  
      return jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('href');
    }).get();
    // 移除 href 属性以防止跳转页面  
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.home a').removeAttr('href');
  }
  //搜索后重置函数
  allowRedirect() {
    //显示站内搜索框
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#site-search').removeClass('site-search-hide');
    //搜索结束隐藏不要跳转页面的警告
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.search-alert').addClass('search-alert-hide');
    //显示搜索按钮
    this.submitBtn.removeClass('submit-hide');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.s').prop('disabled', false);
    let self = this; // 使用外部变量来保存外部 this 的引用  
    // 搜索结束时主页恢复a标签的href属性  
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.home a').each(function (index) {
      // 使用普通函数  
      // 注意这里的 this 指向的是当前遍历到的 DOM 元素  
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('href', self.hrefs[index]); // 使用之前保存的 self 变量  
    });
    //重置进度条
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.progress-container').addClass('progress-container-hide');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.search-progress').attr('value', 0);
    this.ans_id = null;
    this.status = 'none';
    this.searched_question = '';
    this.answer = '';
    this.interval_time = 2500;
    this.searchField.val('');
    clearInterval(this.intervalId);
    clearInterval(this.intervalId3);
  }
  //提问函数
  askAI() {
    //判断搜索框是否为空
    if (this.searchField.val() == '') {
      alert('你还没有输入内容哦');
    } else if (this.searchField.val != '') {
      this.noRedirect();
      let searchTerm = this.searchField.val();
      //用完就立刻重置，免得出现奇怪的bug，例如多次进入if函数 :(
      let url = 'http://101.42.183.176:51114/ask/?question=' + searchTerm;
      this.searched_question = searchTerm;
      //提交问题
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        url: url,
        // 完整的URL，包括查询参数  
        type: 'GET',
        // 请求类型：GET  
        dataType: 'json',
        // 期望的返回数据类型  
        success: data => {
          // 在这里处理返回的数据  
          this.ans_id = data.id;
          this.status = 'Processing';
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('.progress-container').removeClass('progress-container-hide');
          this.progressBar(this.status);
          this.intervalId3 = setInterval(() => {
            this.retrieveAns(); // 检索答案的函数  
            // 假设在某个条件下，我们检索到了答案并想停止间隔调用  
            if (this.status == 'Success') {
              this.status = 'Success';
              clearInterval(this.intervalId3);
            }
          }, this.interval_time); // 每两点五秒调用一次  
        },
        error: (jqXHR, textStatus, errorThrown) => {
          // 请求失败时的回调函数  
          console.error('Error:', textStatus, errorThrown);
        }
      });
    }
  }
  //获取答案
  retrieveAns() {
    if (this.status == 'Processing') {
      let answer_url = 'http://101.42.183.176:51114/retrieve/?id=' + this.ans_id;
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        url: answer_url,
        // 完整的URL，包括查询参数  
        type: 'GET',
        // 请求类型：GET  
        dataType: 'json',
        // 期望的返回数据类型  
        success: data => {
          if (data.status == 'Success') {
            this.status = 'Success';
            this.answer = data.answer;
            //console.log(data.answer); 
            this.interval_time = 500;
          }
        },
        error: (jqXHR, textStatus, errorThrown) => {
          console.error('Error:', textStatus, errorThrown);
        }
      });
    }
    //发布答案页面
    if (this.status == 'Success') {
      var newQuestion = {
        'title': this.searched_question + ':' + this.ans_id,
        'content': this.answer,
        'status': 'publish'
      };
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        beforeSend: xhr => {
          xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
        },
        url: univ_data.root_url + '/wp-json/wp/v2/question/',
        data: newQuestion,
        type: 'POST',
        success: response => {
          this.progressBar(this.status);
          //在生成post之后立刻用ajax请求初始化custom field
          //使页面功能可以正常运作
          jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
            beforeSend: xhr => {
              xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
            },
            type: 'POST',
            url: univ_data.ajaxurl,
            // WordPress的AJAX处理URL  
            data: {
              //ajax action 钩子->传到php调用相应action的函数
              'action': 'initiate_view_count',
              //传递id
              'question_id': response.id
            },
            success: metaresponse => {
              this.allowRedirect();
              jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
                beforeSend: xhr => {
                  xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
                },
                url: univ_data.ajaxurl,
                // 这个URL通常是由WordPress提供的，指向admin-ajax.php                     
                type: 'POST',
                dataType: 'json',
                data: {
                  action: 'update_question_style',
                  // 自定义的action名称，用于在后端识别这个请求             
                  post_id: response.id
                },
                success: function (update_response) {
                  // 处理成功响应                  
                  //console.log(update_response);  
                  window.open(response.link, '_blank');
                },
                error: function (response_error) {
                  // 处理错误                  
                  console.log(response_error);
                }
              });
            },
            error: error => {
              // 处理AJAX请求错误  
              console.log(error);
            }
          });
        },
        error: response => {
          console.log("error");
          console.log(response);
        }
      });
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (smartSearch);

/***/ }),

/***/ "./src/modules/viewingHistory.js":
/*!***************************************!*\
  !*** ./src/modules/viewingHistory.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class ViewingHistory {
  constructor() {
    this.events();
  }
  events() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.delete-viewing-history').on('click', this.deleteViewingHistory.bind(this));
  }
  deleteViewingHistory(e) {
    var thisHistory = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parents("li");
    thisHistory.slideUp();
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader("X-WP-Nonce", univ_data.nonce);
      },
      type: 'POST',
      url: univ_data.ajaxurl,
      // WordPress的AJAX处理URL  
      data: {
        'action': 'delete_viewing_history',
        'user_id': univ_data.current_user,
        'page_id': thisHistory.data('page_id')
      },
      success: function (response) {
        // 处理服务器响应  
        thisHistory.slideUp();
        console.log('congrats');
        console.log(response);
      },
      error: function (error) {
        // 处理AJAX请求错误  
        console.log('sorry');
        console.log(response);
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewingHistory);

/***/ }),

/***/ "./css/style.scss":
/*!************************!*\
  !*** ./css/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["jQuery"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkfictional_university_theme"] = globalThis["webpackChunkfictional_university_theme"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map