// 创建 websocket 实例
let websocket = new WebSocket("ws://" + location.host + "/onlineChat");

// 获取左侧标签栏所有标签
let tabLists = document.querySelector(".tab-list").querySelectorAll("li");
// 获取好友标签选中后的中间框好友通知标签
let addFriendM = document.querySelector(".add-friend");
let friendNoticeM = document.querySelector(".friend-notice");
// 获取设置标签选中后的中间框各标签
let setLists = document.querySelector(".set-list").querySelectorAll("li");
// 获取中间框中的各父标签
let sessionM = document.getElementById("session-middle");
let friendM = document.getElementById("friend-middle");
let setM = document.getElementById("set-middle");
// 获取好友列表
let friendList = document.querySelector(".friend-list");
// 获取右侧框中的各父标签
let userRight = document.querySelector(".user-set-right");
let updatePasswordRight = document.querySelector(".user-set-password");
let updateEmailRight = document.querySelector(".user-set-email");
let sessionRight = document.querySelector(".session-right");
let friendRight = document.querySelector(".friend-right");
let addFriendRight = document.querySelector(".add-friend-right");
let friendNoticeRight = document.querySelector(".friend-notice-right");
let headSetRight = document.querySelector(".head-set-right");
let manRight = document.querySelector(".man-right");
let manSetRight = document.querySelector(".man-set-right");

// 会话中间显示
function selectSessionM() {
    tabLists[1].style.display = "none";
    tabLists[2].style.display = "none";
    tabLists[5].style.display = "none";
    tabLists[0].style.display = "";
    tabLists[3].style.display = "";
    tabLists[6].style.display = "";
    sessionM.style.display = "";
    friendM.style.display = "none";
    setM.style.display = "none";
}

// 右侧组件全隐藏
function noneAllRight() {
    friendRight.style.display = 'none';
    addFriendRight.style.display = 'none';
    friendNoticeRight.style.display = 'none';
    headSetRight.style.display = 'none';
    manRight.style.display = 'none';
    manSetRight.style.display = 'none';
    sessionRight.style.display = 'none';
    userRight.style.display = 'none';
    updatePasswordRight.style.display = 'none';
    updateEmailRight.style.display = 'none';
}

// 清空修改信息框
function clearUpdateMan() {
    document.querySelector(".set-nickname").value = '';
    document.querySelector(".set-phone").value = '';
}

// 清空修改密码框
function clearUpdatePassword() {
    document.querySelector(".set-password").value = '';
    document.querySelector(".set-password2").value = '';
}

// 清空修改邮箱框
function clearUpdateEmail() {
    document.querySelector(".set-email").value = '';
    document.querySelector(".set-verification-input").value = '';
}

// 显示右侧对话界面
function selectSessionRight() {
    noneAllRight();
    sessionRight.style.display = '';
}

// 跳转修改密码
function goUpdatePassword() {
    noneAllRight();
    updatePasswordRight.style.display = "";
}

// 跳转修改邮箱
function goUpdateEmail() {
    noneAllRight();
    updateEmailRight.style.display = "";
}

// 修改个人信息按钮
function manSet() {
    noneAllRight();
    manSetRight.style.display = "";
}

// 修改账号相关返回按钮
function setReturnUserRight() {
    noneAllRight();
    userRight.style.display = "";
}

// 修改个人信息返回按钮
function setReturnManRight() {
    noneAllRight();
    manRight.style.display = "";
}

// 将滚动条滚动到最底部
function scrollBottom(messageRight) {
    let messageRightClientHeight = messageRight.offsetHeight;
    let messageRightScrollHeight = messageRight.scrollHeight;
    messageRight.scrollTo(0, messageRightScrollHeight - messageRightClientHeight);
}

// 初始化选择标签的点击事件
function tabInit() {
    // 会话标签点击事件
    tabLists[1].addEventListener("click", function () {
        selectSessionM();
    });

    // 好友标签点击事件
    tabLists[3].addEventListener("click", function () {
        getFriendList();
        tabLists[1].style.display = "";
        tabLists[2].style.display = "";
        tabLists[5].style.display = "none";
        tabLists[0].style.display = "none";
        tabLists[3].style.display = "none";
        tabLists[6].style.display = "";
        sessionM.style.display = "none";
        friendM.style.display = "";
        setM.style.display = "none";
    });

    // 邮箱标签点击事件
    tabLists[4].addEventListener("click", function () {
        window.open("https://mail.163.com/");
    });

    // 设置标签点击事件
    tabLists[6].addEventListener("click", function () {
        tabLists[1].style.display = "";
        tabLists[2].style.display = "none";
        tabLists[5].style.display = "";
        tabLists[0].style.display = "none";
        tabLists[3].style.display = "";
        tabLists[6].style.display = "none";
        sessionM.style.display = "none";
        friendM.style.display = "none";
        setM.style.display = "";
    });

    // 好友添加标签点击事件
    addFriendM.addEventListener("click", function () {
        noneAllRight();
        addFriendRight.style.display = "";
    });

    // 好友通知标签点击事件
    friendNoticeM.addEventListener("click", function () {
        noneAllRight();
        friendNoticeRight.style.display = "";
        getFriendNoticeRight();
    });

    // 账号安全标签点击事件
    setLists[0].addEventListener("click", function () {
        noneAllRight();
        userRight.style.display = "flex";
    })

    // 修改头像标签点击事件
    setLists[1].addEventListener("click", function () {
        noneAllRight();
        headSetRight.style.display = "";
    });

    // 个人信息标签点击事件
    setLists[2].addEventListener("click", function () {
        setReturnManRight();
        getUserInfo();
    });
}

tabInit();

// 获取验证码
function getEmailCode() {
    let e_div = document.querySelector(".set-email");
    let e_but = document.querySelector(".set-verification-button");
    let email = e_div.value;

    // 禁用按钮
    e_but.disabled = true;
    // 添加按钮解除禁用定时器
    let timeoutId = setTimeout(function () {
        e_but.disabled = false;
    }, 60000);

    // 添加触发输入事件
    e_div.addEventListener("input", function () {
        // 恢复默认样式
        e_div.style.border = "1px solid";
    });

    // 判空
    if (email == null || email === "") {
        // 改变样式提醒
        e_div.style.border = "2px solid red";
        // 解除禁用并取消定时器
        e_but.disabled = false;
        clearTimeout(timeoutId);
        return;
    }

    // 交互后端
    $.ajax({
        url: "/getUpdateEmailCode",
        type: "POST",
        data: {
            userEmail: email,
        }
    });
}

// 获取登录用户的个人信息
function getUserInfo() {
    $.ajax({
        type: "get",
        url: "/getUserInfo",
        success: function (res) {
            if (res.id && res.id > 0) {
                // 左侧头像
                let h_div = document.querySelector(".head");
                // 修改头像页面
                let set_head_div = document.querySelector(".head-set-right-head");
                // 个人信息显示页面
                let man_head_div = document.querySelector(".man-right-head");
                let man_username_div = document.querySelector(".man-right-username");
                let man_phone_div = document.querySelector(".man-right-phone");
                let man_email_div = document.querySelector(".man-right-email");
                if (res.photo != null && res.photo !== "") {
                    let imgUrl =
                        "https://biao22.oss-cn-guangzhou.aliyuncs.com/" + res.photo;
                    h_div.style.backgroundImage = "url('" + imgUrl + "')";
                    set_head_div.src = imgUrl;
                    man_head_div.src = imgUrl;
                } else {
                    let imgUrl =
                        "https://biao22.oss-cn-guangzhou.aliyuncs.com/waiting.jpg";
                    h_div.style.backgroundImage = "url('" + imgUrl + "')";
                    set_head_div.src = imgUrl;
                    man_head_div.src = imgUrl;
                }

                // 修改基本信息
                man_username_div.innerHTML = res.nickname + '(' + res.username + ')';
                man_phone_div.innerHTML = res.phone;
                man_email_div.innerHTML = res.email;
            } else {
                alert("找不到会话信息，请重新登录");
                window.location.href = "index.html";
            }
        },
    });
}

getUserInfo();

// 修改头像
async function updateHead() {
    const fileInput = document.querySelector(".update-head-file");
    const file = fileInput.files[0];
    if (!file) {
        alert("请选择图片文件");
        return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch("/updateHead", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            alert("修改成功");
            getUserInfo();
        } else {
            alert("修改失败");
            location.href = "index.html";
        }
    } catch (error) {
        alert(error);
    }
}

// 修改个人信息
function updateMan() {
    let uNickname = document.querySelector(".set-nickname").value;
    let uPhone = document.querySelector(".set-phone").value;

    let req = {
        nickname: '',
        phone: ''
    };

    if (uNickname != null && uNickname !== "") {
        req.nickname = uNickname;
    }

    if (uPhone != null && uPhone !== "") {
        req.phone = uPhone;
    }

    if (Object.keys(req).length !== 0) {
        $.ajax({
            url: '/updateMan',
            type: 'POST',
            data: {
                nickname: req.nickname,
                phone: req.phone
            },
            success: function (res) {
                if (res.code === 200) {
                    clearUpdateMan();
                    let man_username_div = document.querySelector(".man-right-username");
                    let man_phone_div = document.querySelector(".man-right-phone");
                    let man_email_div = document.querySelector(".man-right-email");

                    man_username_div.innerHTML = res.userInfo.nickname + '(' + res.userInfo.username + ')';
                    man_phone_div.innerHTML = res.userInfo.phone;
                    man_email_div.innerHTML = res.userInfo.email;
                    setReturnManRight();
                } else if (res.code === 500) {
                    alert(res.reason);
                    location.href = "index.html";
                } else {
                    clearUpdateMan();
                    alert(res.reason);
                }
            }
        })
    }
}

function getFriendList() {
    $.ajax({
        type: "POST",
        url: "/getFriendList",
        success: function (res) {
            if (res != null && res.code === 200) {
                let friends = res.friends;
                friendList.innerHTML = '';
                for (let i = 0; i < friends.length; i++) {
                    let li = document.createElement("li");
                    li.innerHTML = "<img src='https://biao22.oss-cn-guangzhou.aliyuncs.com/" +
                        friends[i].photo + "'>" + "<div class='username'>" +
                        friends[i].nickname + "</div>";
                    li.setAttribute('friendId', friends[i].id);
                    friendList.appendChild(li);

                    li.addEventListener("click", function () {
                        noneAllRight();
                        friendRight.style.display = "";
                        getFriendData(li.getAttribute('friendId'));
                    });
                }
            }
        }
    });
}

// 获取好友信息
function getFriendData(id) {
    $.ajax({
        type: "POST",
        url: "/getFriendData",
        data: {
            id: id
        },
        success: function (res) {
            if (res != null && res.code === 200) {
                if (res.userInfo != null && res.userInfo.username != null) {
                    let head = document.querySelector(".friend-right-head");
                    let name = document.querySelector(".friend-right-username");
                    let email = document.querySelector(".friend-right-email");
                    let phone = document.querySelector(".friend-right-phone");
                    let send = document.querySelector(".friend-right-send");

                    let headUrl = "https://biao22.oss-cn-guangzhou.aliyuncs.com/" + res.userInfo.photo;
                    head.style.backgroundImage = "url('" + headUrl + "')";
                    name.innerHTML = res.userInfo.nickname + '(' + res.userInfo.username + ')';
                    email.innerHTML = res.userInfo.email;
                    phone.innerHTML = res.userInfo.phone;

                    send.addEventListener("click", function () {
                        createSessionFriend(res.userInfo);
                    });
                }
            }
        }
    });
}

// 好友信息界面的发送消息按钮点击事件
function createSessionFriend(friend) {
    selectSessionM(); // 显示中间会话

    let lis = document.querySelectorAll('.session-list li');
    for (let i = 0; i < lis.length; i++) {
        if (lis[i].getAttribute("username") === friend.username) {
            clickSession(lis[i], friend.nickname);
            return;
        }
    }

    // 发送后端创建新的会话
    $.ajax({
        type: "POST",
        url: "/createSession",
        data: {
            friendId: friend.id,
        },
        success: function (res) {
            if (res !== null && res.code === 200) {
                // 创建会话添加到中间框
                let li = createSession(res.session.sessionId, friend);
                let time = li.querySelector('.time');
                time.innerHTML = res.session.updateTimeStr;
                // 添加到ul
                let ul = document.querySelector('.session-list');
                ul.insertBefore(li, ul.children[0]);
                // 添加点击会话事件
                li.onclick = function () {
                    clickSession(li, li.querySelector('.nickname').innerHTML);
                }
                // 触发点击会话事件
                clickSession(li, li.querySelector('.nickname').innerHTML);
            } else {

            }
        }
    })
}


// 获取搜索的好友
function getSearchFriendList() {
    let input = document.querySelector('.search-friend');
    let inputName = input.value;
    if (inputName !== "") {
        // 添加搜索框没数据之后自动还原好友列表
        input.addEventListener("input", function (event) {
            if (event.target.value === "") {
                getFriendList();
            }
        })

        $.ajax({
            type: "POST",
            url: "/searchFriend",
            data: {
                name: inputName
            },
            success: function (res) {
                if (res != null && res.code === 200) {
                    let friends = res.friends;
                    friendList.innerHTML = '';
                    for (let i = 0; i < friends.length; i++) {
                        let li = document.createElement("li");
                        let htmll = "<img src='https://biao22.oss-cn-guangzhou.aliyuncs.com/" +
                            friends[i].photo + "'>" + "<div class='username'>" +
                            friends[i].nickname + "</div>";
                        li.innerHTML = htmll;
                        li.setAttribute('friendId', friends[i].id);
                        friendList.appendChild(li);

                        li.addEventListener("click", function () {
                            sessionRight.style.display = "none";
                            friendRight.style.display = "";
                            friendNoticeRight.style.display = "none";
                            headSetRight.style.display = "none";
                            manRight.style.display = "none";
                            manSetRight.style.display = "none";
                            addFriendRight.style.display = "none";
                            getFriendData(li.getAttribute('friendId'));
                        })
                    }
                }
            }
        });
    }
}

// 获取搜索到的用户
function getSearchUser() {
    let inputName = document.querySelector('.add-friend-input').value;
    if (inputName !== "") {
        $.ajax({
            type: "POST",
            url: "/searchUser",
            data: {
                name: inputName
            },
            success: function (res) {
                if (res != null && res.code === 200) {
                    let ul = document.querySelector('.add-friend-ul');
                    ul.innerHTML = '';
                    let li = document.createElement("li");
                    let htmll = "<img src='https://biao22.oss-cn-guangzhou.aliyuncs.com/" +
                        res.userInfo.photo + "'>" + "<div class='username'>" +
                        res.userInfo.nickname + "</div>";
                    li.innerHTML = htmll;
                    let b = document.createElement("button");
                    b.innerHTML = '添加';
                    b.addEventListener("click", function () {
                        sendAddFriend(res.userInfo.id);
                    })
                    li.appendChild(b);
                    ul.appendChild(li);
                }
            }
        });
    }
}

// 发送好友申请
function sendAddFriend(id) {
    $.ajax({
        type: "POST",
        url: "/sendAddFriend",
        data: {
            id: id
        },
        success: function (res) {
            if (res != null && res.code === 200) {
                alert(res.reason);
                location.href = 'clientUser.html';
            } else if (res != null && res.code !== 200) {
                alert(res.reason);
            } else {
                alert('请求出错');
            }
        }
    });
}

// 获取好友通知
function getFriendNoticeRight() {
    $.ajax({
        type: "POST",
        url: "/getFriendNotice",
        success: function (res) {
            if (res != null && res.code === 200) {
                let ul = document.querySelector(".friend-notice-right");
                ul.innerHTML = "";
                if (res.friendHistory.length === 0) {
                    ul.innerHTML += "<h1 style='font-weight: 100'>暂无好友通知</h1>";
                }
                for (let i = 0; i < res.friendHistory.length; i++) {
                    if (res.friendHistory[i].state === 1) {
                        // 待处理
                        let li = document.createElement("li");
                        let button1 = document.createElement("button");
                        let button2 = document.createElement("button");
                        button1.innerHTML = "同意";
                        button1.className = "button1";
                        button2.innerHTML = "拒绝";
                        button2.className = "button2";
                        button1.addEventListener("click", function () {
                            agreeFriend(res.friendHistory[i].userId);
                        });
                        button2.addEventListener("click", function () {
                            refuseFriend(res.friendHistory[i].userId);
                        });

                        let b = document.createElement("div");
                        b.className = "buttonTwo";
                        b.appendChild(button1);
                        b.appendChild(button2);
                        let htmll = "<img src='https://biao22.oss-cn-guangzhou.aliyuncs.com/" +
                            res.friendHistory[i].photo + "'>" + "<div class='username'>" +
                            res.friendHistory[i].nickname + " 请求加为好友</div>";
                        li.innerHTML = htmll;
                        li.appendChild(b);
                        ul.appendChild(li);
                    } else if (res.friendHistory[i].state === 0) {
                        // 已拒绝
                        let li = document.createElement("li");
                        let htmll = "<img src='https://biao22.oss-cn-guangzhou.aliyuncs.com/" +
                            res.friendHistory[i].photo + "'>" + "<div class='username'>" +
                            res.friendHistory[i].nickname + " 请求加为好友</div>" +
                            "<div class=\"text\">已拒绝</div>";
                        li.innerHTML = htmll;
                        ul.appendChild(li);
                    } else if (res.friendHistory[i].state === 2) {
                        // 已同意
                        let li = document.createElement("li");
                        let htmll = "<img src='https://biao22.oss-cn-guangzhou.aliyuncs.com/" +
                            res.friendHistory[i].photo + "'>" + "<div class='username'>" +
                            res.friendHistory[i].nickname + " 请求加为好友</div>" +
                            "<div class=\"text\">已同意</div>";
                        li.innerHTML = htmll;
                        ul.appendChild(li);
                    }
                }
            }
        }
    });
}

// 同意好友申请
function agreeFriend(id) {
    $.ajax({
        type: "POST",
        url: "/agreeAddFriend",
        data: {
            id: id
        },
        success: function (res) {
            if (res != null && res.code === 200) {
                getFriendNoticeRight();
                getFriendList();
            } else {
                alert("请求失败，请稍后重试");
            }
        }
    })
}

// 拒绝好友申请
function refuseFriend(id) {
    $.ajax({
        type: "POST",
        url: "/refuseAddFriend",
        data: {
            id: id
        },
        success: function (res) {
            if (res != null && res.code === 200) {
                getFriendNoticeRight();
            } else {
                alert("请求失败，请稍后重试");
            }
        }
    })
}

// 获取会话列表
function getSessionList() {
    $.ajax({
        type: 'POST',
        url: 'getSessionList',
        success: function (res) {
            let sessionListUL = document.querySelector('.session-list');
            sessionListUL.innerHTML = '';
            for (let session of res.sessions) {
                // 编辑会话的最近消息提示
                if (session.lastMessage !== null && session.lastMessage.length > 10) {
                    session.lastMessage = session.lastMessage.substring(0, 8) + '...';
                }

                // 创建新的 li 标签，编写html
                let li = createSession(session.sessionId, session.userInfo);
                let div = li.querySelector('.message');
                div.innerHTML = session.lastMessage;
                let time = li.querySelector('.time');
                time.innerHTML = session.updateTimeStr;
                // 将li加到ul
                sessionListUL.appendChild(li);

                // 给li加上点击事件
                li.onclick = function () {
                    clickSession(li, li.querySelector('.nickname').innerHTML);
                }
            }
        }
    });
}

getSessionList();

// 创建新的会话
function createSession(sessionId, userInfo) {
    let curSessionLi = document.createElement('li');
    curSessionLi.setAttribute("session-id", sessionId);
    curSessionLi.setAttribute("username", userInfo.username);
    // 创建li中的img
    let img = document.createElement('img');
    img.src = 'https://biao22.oss-cn-guangzhou.aliyuncs.com/' + userInfo.photo;
    // 将img添加到li
    curSessionLi.appendChild(img);
    // 创建中间的用户名和消息
    let user = document.createElement('div');
    user.className = 'user';
    // 创建用户名
    let nickname = document.createElement('div');
    nickname.className = 'nickname';
    nickname.innerHTML = userInfo.nickname;
    // 创建最近消息
    let message = document.createElement('div');
    message.className = 'message';
    // 将用户名和最近消息添加到中间
    user.appendChild(nickname);
    user.appendChild(message);
    // 将中间添加到li
    curSessionLi.appendChild(user);
    // 创建右侧
    let time_p = document.createElement('div');
    time_p.className = 'time-prompt';
    // 创建时间
    let time = document.createElement('div');
    time.className = 'time';
    // 将时间添加到右侧
    time_p.appendChild(time);
    // 将右侧讲到li
    curSessionLi.appendChild(time_p);

    return curSessionLi;
}

// 会话点击事件
function clickSession(li, nickname) {
    // 获取所有的会话与当前会话做比较
    // 不是当前会话的取消会话的属性
    let lis = document.querySelectorAll('.session-list li');
    for (let i = 0; i < lis.length; i++) {
        if (lis[i] === li) {
            lis[i].style.backgroundColor = 'rgb(200,198,197)';
        } else {
            lis[i].style.backgroundColor = 'white';
        }
    }

    /* 获取历史消息显示在右侧 */
    selectSessionRight();

    // 获取历史消息
    $.ajax({
        type: 'POST',
        url: 'getMessageByOneSession',
        data: {
            sessionId: li.getAttribute('session-id')
        },
        success: function (res) {
            let messageRight = document.querySelector('.right-session-messages');
            messageRight.innerHTML = '';
            if (res != null && res.code === 200) {
                // 添加上侧用户名
                document.querySelector('.right-session-username').innerHTML = nickname;

                // 扫描历史消息添加显示
                for (let i = 0; i < res.messages.length; i++) {
                    addMessage(res.messages[i], res.userInfo, res.friendInfo);
                }

                // 给发送按钮添加点击事件
                document.querySelector('.right-session-send').onclick = function () {
                    sendMessage(li.getAttribute('session-id'));
                };
            }
        }
    });
}

// 添加一条消息
function addMessage(messages, userInfo, friendInfo) {
    let messageRight = document.querySelector('.right-session-messages');
    // 根据是否id判断在左还是右
    // 右侧
    if (messages.fromId === userInfo.id) {
        let message = document.createElement('div');
        message.className = 'message-right';
        let div = document.createElement('div');
        let h4 = document.createElement('h4');
        h4.innerHTML = userInfo.nickname;
        let div2 = document.createElement('div');
        div2.innerHTML = messages.content;
        div.appendChild(h4);
        div.appendChild(div2);
        let img = document.createElement('img');
        img.src = 'https://biao22.oss-cn-guangzhou.aliyuncs.com/' + userInfo.photo;

        message.appendChild(div);
        message.appendChild(img);
        messageRight.appendChild(message);
    } else {
        let message = document.createElement('div');
        message.className = 'message-left';
        let div = document.createElement('div');
        let h4 = document.createElement('h4');
        h4.innerHTML = friendInfo.nickname;
        let div2 = document.createElement('div');
        div2.innerHTML = messages.content;
        div.appendChild(h4);
        div.appendChild(div2);
        let img = document.createElement('img');
        img.src = 'https://biao22.oss-cn-guangzhou.aliyuncs.com/' + friendInfo.photo;

        message.appendChild(img);
        message.appendChild(div);
        messageRight.appendChild(message);
    }
    scrollBottom(messageRight);
}

// 消息发送按钮点击事件
function sendMessage(sessionId) {
    // 获取输入框消息
    let message = document.querySelector('.message-input').value;
    if (message === null || message === '') return;

    // 发送请求
    let req = {
        type: 'addMessage',
        sessionId: sessionId,
        content: message
    };
    websocket.send(JSON.stringify(req));
    document.querySelector('.message-input').value = '';
}

// websocket连接成功回调
websocket.onopen = function () {
};

// websocket收到消息回调
websocket.onmessage = function (e) {
    // 将收到的数据转成 js 对象
    let resp = JSON.parse(e.data);
    if (resp.message.type === "addMessageSuccess") {
        handleMessage(resp);
    }
};

// websocket连接关闭回调
websocket.onclose = function () {
};

// websocket连接异常回调
websocket.onerror = function () {
};

// 收到的是聊天消息的处理
function handleMessage(resp) {
    // 先判断当前的会话列表中是否有该消息属于的会话
    // 如果有则置顶该会话
    // 如果没有则创建并置顶该会话

    let curSessionLi = null;
    let sessionLis = document.querySelectorAll('.session-list li');
    for (let li of sessionLis) {
        let liId = li.getAttribute('session-id');
        if (resp.message.sessionId.toString() === liId) {
            curSessionLi = li;
            curSessionLi.style.backgroundColor = 'rgb(200,198,197)';
            addMessage(resp.message, resp.userInfo, resp.friendInfo);
            break;
        }
    }

    if (curSessionLi === null) {
        // 没有会话的情况
        curSessionLi = createSession(resp.message.sessionId, resp.friendInfo);
        // 添加到ul
        let ul = document.querySelector('.session-list');
        ul.insertBefore(curSessionLi, ul.children[0]);
        // 添加点击事件
        curSessionLi.onclick = function () {
            clickSession(curSessionLi, curSessionLi.querySelector('.username'));
        }
    }

    // 修改会话底部的消息提示
    let div = curSessionLi.querySelector('.message');
    div.innerHTML = resp.message.content;
    if (div.innerHTML.length > 10) {
        div.innerHTML = div.innerHTML.substring(0, 10) + '...';
    }

    // 修改会话时间
    let time = curSessionLi.querySelector('.time');
    time.innerHTML = resp.session.updateTimeStr;
}

// 修改邮箱
function updateEmail() {
    let uEmail = document.querySelector(".set-email").value;
    let uEmailCode = document.querySelector(".set-verification-input").value;

    if (uEmail === null || uEmail === "") {
        alert("请输入邮箱");
        return;
    } else if (uEmailCode === null || uEmailCode === "") {
        alert("请输入验证码");
        return;
    }

    $.ajax({
        url: '/updateEmail',
        type: 'POST',
        data: {
            email: uEmail,
            emailCode: uEmailCode,
        },
        success: function (res) {
            if (res.code === 200) {
                clearUpdateEmail();
            } else if (res.code === 500) {
                alert(res.reason);
                location.href = "index.html";
            } else {
                clearUpdateEmail();
                alert(res.reason);
            }
        }
    })

}

// 修改密码
function updatePassword() {
    let uPassword = document.querySelector(".set-password").value;
    let uPassword2 = document.querySelector(".set-password2").value;

    if (uPassword === null || uPassword === "") {
        alert("请输入密码");
        return;
    } else if (uPassword2 === null || uPassword2 === "") {
        alert("请确认密码");
        return;
    } else if (uPassword !== uPassword2) {
        alert("两次密码不一致");
        document.querySelector(".set-password2").value = "";
        return;
    }

    $.ajax({
        url: '/updatePassword',
        type: 'POST',
        data: {
            password: uPassword
        },
        success: function (res) {
            if (res.code === 200) {
                clearUpdatePassword();
                alert("修改成功，请重新登录！");
                location.href = "index.html";
            } else if (res.code === 500) {
                alert(res.reason);
                location.href = "index.html";
            } else {
                clearUpdatePassword();
                alert(res.reason);
            }
        }
    })

}

// 账号申请冻结
function applyFreeze() {
    if (confirm("是否确定申请冻结此账户？")) {
        $.ajax({
            url: '/applyFreeze',
            type: 'POST',
            success: function (res) {
                if (res.code === 200) {
                    alert("申请成功，请等待管理员同意，在此期间如若再次登录此账户则视为放弃冻结申请！");
                    window.location.href = "index.html";
                } else if (res.code === 500) {
                    alert(res.reason);
                    location.href = "index.html";
                }
            }
        })
    }
}

// 账号申请注销
function applyCancel() {
    if (confirm("是否确定申请注销此账户？")) {
        $.ajax({
            url: '/applyCancel',
            type: 'POST',
            success: function (res) {
                if (res.code === 200) {
                    alert("申请成功，请等待管理员同意，在此期间如若再次登录此账户则视为放弃注销申请！");
                    window.location.href = "index.html";
                } else if (res.code === 500) {
                    alert(res.reason);
                    location.href = "index.html";
                }
            }
        })
    }
}