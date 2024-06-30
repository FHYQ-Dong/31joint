import $ from 'jquery';
class siteSearch{
    //constructor中的代码在创建对象时会立刻执行
    constructor(){
        this.addSearchHtml();
        this.openBtn=$("#site-search");//指向搜索按钮class
        this.closeBtn=$(".search-overlay__close");//获取关闭搜索按钮class
        this.searchOverlay=$(".search-overlay");//class用.来获取
        this.searchField = $('#search-item');//id用#来获取
        this.events();
        this.searchState = false;//搜索状态
        this.typingTimer;//搜索计时器
        this.resultsDiv = $('#search-overlay__results');//搜索结果
        this.spinnerState = false;//搜索等待图标状态
        this.previousValue; 
    }
    //2.events
    events(){   
        this.openBtn.on('click',this.openOverlay.bind(this));
        this.closeBtn.on('click',this.closeOverlay.bind(this));
        //keyup只在放开按键时触发，keydown按下后不松开就一直触发
        $(document).on('keyup',this.keyPressDispathcer.bind(this));
        //keydown的时间太短，searchfield来不及更新状态
        //所以要用keyup
        this.searchField.on('keyup',this.typingLogic.bind(this));           
        //若正在只能搜索：禁用站内搜索
    }
    //3.functions   
    typingLogic(){
        if(this.searchField.val()!=this.previousValue){
            //每次按键按下都会触发函数
            //需要重置计时器
            clearTimeout(this.typingTimer);
            if(this.searchField.val()){//输入框有内容才继续
                if(!this.spinnerState){
                this.resultsDiv.html('<div class="spinner-loader"></div>'); 
                this.spinnerState=true;
                }
                this.typingTimer=setTimeout(this.getResults.bind(this),500);       
            }else{//若输入框为空，就打印空结果，置零等待图标
                this.resultsDiv.html('')
                this.spinnerState=false;
            }
        }
        this.previousValue=this.searchField.val();      
    }
    //搜索请求
    getResults() {
        const searchTerm = this.searchField.val(); // 获取搜索词
        //若用户搜索了某个键对应的数组中的任何一个元素
        //则查询该数组的所有内容并显示
        const replaceTerms = {
            '城乡居民基本医疗保险': ['城乡居民基本医疗保险','城乡居民', '一老一小', '学生', '儿童', '婴幼儿', '老年人', '劳动年龄内居民'],
            '门诊特殊病': ['门诊特殊病','门特病', '特殊病', '门诊特病', '恶性肿瘤', '肿瘤', '癌症', '透析', '肾透析', '移植', '抗排异']
        };
        let combinedResults = { notices: [], policies: [], questions: [] }; // 初始化结果对象
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
                const request = $.getJSON(univ_data.root_url + '/wp-json/univ/v1/search?term=' + replaceTerm, (results) => {
                    // 将搜索结果合并到总结果对象中
                    this.mergeResults(combinedResults, results);
                });
                ajaxRequests.push(request); // 将请求存储到数组中
            });
        } else {
            // 如果不在列表中，则直接按原搜索词进行搜索
            const request = $.getJSON(univ_data.root_url + '/wp-json/univ/v1/search?term=' + searchTerm, (results) => {
                // 将搜索结果合并到总结果对象中
                this.mergeResults(combinedResults, results);
            });
            ajaxRequests.push(request); // 将请求存储到数组中
        }        
    
        // 当请求完成时
        $.when(...ajaxRequests).done(() => {
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
    
    
    keyPressDispathcer(e){
        //!$('input, textarea').is(':focus') 当前没有打开任何输入框
        //按s键打开站内搜索框
        //if(e.keyCode==83&&this.searchState==false&&!$('input, textarea').is(':focus')){
            //this.openOverlay();
        //}
        if(e.keyCode==27&&this.searchState==true){
            this.closeOverlay();
        }
    }
    openOverlay(){
        this.searchOverlay.addClass("search-overlay--active");
        $('body').addClass('body-no-scroll');
        this.searchField.val('');
        setTimeout(()=>this.searchField.focus(),301);
        this.searchState=true;
        return false;
    }
    closeOverlay(){
        this.searchOverlay.removeClass("search-overlay--active");
        $('body').removeClass('body-no-scroll');
        this.searchState=false;
    }
    //搜索页面的样式
    addSearchHtml(){
        $('body').append(`
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
        `)
    }
}
export default siteSearch