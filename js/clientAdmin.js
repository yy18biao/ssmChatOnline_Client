// TODO 刷新界面问题
// TODO 个人信息功能

// 获取左侧导航的所有按钮
let leftTabLists = document.querySelector(".menu").querySelectorAll("button");
// 获取普通用户管理界面
let userCenter = document.querySelector('.userCenter');
// 获取个人信息管理界面
let adminCenter = document.querySelector('.adminCenter');
// 获取修改用户界面
let updateUserUi = document.querySelector('.updateUser');
// 获取普通用户管理界面所有导航按钮
let tabLists = document.querySelector(".userCenter").querySelectorAll("button");
// 获取正常状态用户列表界面
let normal = document.querySelector('.normal');
// 获取冻结状态用户列表界面
let freeze = document.querySelector('.freeze');
// 获取冻结申请列表界面
let freezeApply = document.querySelector('.freezeApply');
// 获取注销申请列表界面
let cancelApply = document.querySelector('.cancelApply');
// 获取新增用户界面
let addUserUi = document.querySelector('.addUser');


// 隐藏所有主界面
function noneAll() {
    normal.style.display = 'none';
    tabLists[0].style.backgroundColor = 'transparent';
    freeze.style.display = 'none';
    tabLists[1].style.backgroundColor = 'transparent';
    freezeApply.style.display = 'none';
    tabLists[2].style.backgroundColor = 'transparent';
    cancelApply.style.display = 'none';
    tabLists[3].style.backgroundColor = 'transparent';
    addUserUi.style.display = 'none';
    tabLists[4].style.backgroundColor = 'transparent';
}

// 切换普通用户管理界面
function switchUser() {
    if (userCenter.style.display === 'none') {
        userCenter.style.display = '';
        adminCenter.style.display = 'none';
        updateUserUi.style.display = 'none';
        leftTabLists[0].style.backgroundColor = 'rgb(18, 150, 219)';
        leftTabLists[1].style.backgroundColor = 'transparent';
    }
}

// 切换个人信息管理界面
function switchAdmin() {
    if (adminCenter.style.display === 'none') {
        userCenter.style.display = 'none';
        adminCenter.style.display = '';
        updateUserUi.style.display = 'none';
        leftTabLists[0].style.backgroundColor = 'transparent';
        leftTabLists[1].style.backgroundColor = 'rgb(18, 150, 219)';

    }
}

// 切换用户修改界面
function switchUpdateUser() {
    if (updateUserUi.style.display === 'none') {
        userCenter.style.display = 'none';
        adminCenter.style.display = 'none';
        updateUserUi.style.display = '';
        leftTabLists[0].style.backgroundColor = 'rgb(18, 150, 219)';
        leftTabLists[1].style.backgroundColor = 'transparent';
    }
}

// 切换正常状态用户列表界面
function switchNormal() {
    noneAll();
    normal.style.display = '';
    tabLists[0].style.backgroundColor = 'rgb(18, 150, 219)';
    getAllNormalUser();
}

// 切换冻结状态用户列表界面
function switchFreeze() {
    noneAll();
    freeze.style.display = '';
    tabLists[1].style.backgroundColor = 'rgb(18, 150, 219)';
    getAllFreezeUser();
}

// 切换冻结申请列表界面
function switchFreezeApply() {
    noneAll();
    freezeApply.style.display = '';
    tabLists[2].style.backgroundColor = 'rgb(18, 150, 219)';
    getAllApplyFreezeUser();
}

// 切换注销申请列表界面
function switchCancelApply() {
    noneAll();
    cancelApply.style.display = '';
    tabLists[3].style.backgroundColor = 'rgb(18, 150, 219)';
    getAllApplyCancelUser();
}

// 切换新增用户界面
function switchAddUser() {
    noneAll();
    addUserUi.style.display = '';
    tabLists[4].style.backgroundColor = 'rgb(18, 150, 219)';
}

// 获取所有正常状态下的用户
function getAllNormalUser() {
    $.ajax({
        type: 'GET',
        url: '/getAllNormalUser',
        success: function (res) {
            if (res.code === 200) {
                // 获取列表父元素
                let ul = document.querySelector(".normal");
                ul.innerHTML = '';

                // 循环响应一次创建每一行
                for (let user of res.users) {
                    let li = document.createElement("li");
                    li.innerHTML = "<div><img src='https://biao22.oss-cn-guangzhou.aliyuncs.com/" + user.photo +
                        "'></div>" + "<p>" + user.nickname + "</p>" +
                        "<p>" + user.username + "</p>" +
                        "<p>" + user.email + "</p>" +
                        "<p><button onclick=freezeUser(" + user.username + ")>冻结</button>" +
                        "<button onclick=switchUpdateUser()>修改</button>" +
                        "<button onclick=cancelUser(" + user.username + ")>删除</button></p>";
                    ul.appendChild(li);
                }
            }
        }
    })
}

getAllNormalUser();

// 获取所有冻结状态下的用户
function getAllFreezeUser() {
    $.ajax({
        type: 'GET',
        url: '/getAllFreezeUser',
        success: function (res) {
            if (res.code === 200) {
                // 获取列表父元素
                let ul = document.querySelector(".freeze");
                ul.innerHTML = '';

                // 循环响应一次创建每一行
                for (let user of res.users) {
                    let li = document.createElement("li");
                    li.innerHTML = "<div><img src='https://biao22.oss-cn-guangzhou.aliyuncs.com/" + user.photo +
                        "'></div>" + "<p>" + user.nickname + "</p>" +
                        "<p>" + user.username + "</p>" +
                        "<p>" + user.email + "</p>" +
                        "<p><button onclick=unFreezeUser(" + user.username + ")>解冻</button></p>";
                    ul.appendChild(li);
                }
            }
        }
    })
}

// 获取所有申请冻结的用户
function getAllApplyFreezeUser() {
    $.ajax({
        type: 'GET',
        url: '/getAllApplyFreezeUser',
        success: function (res) {
            if (res.code === 200) {
                // 获取列表父元素
                let ul = document.querySelector(".freezeApply");
                ul.innerHTML = '';

                // 循环响应一次创建每一行
                for (let user of res.users) {
                    let li = document.createElement("li");
                    li.innerHTML = "<div><img src='https://biao22.oss-cn-guangzhou.aliyuncs.com/" + user.photo +
                        "'></div>" + "<p>" + user.nickname + "</p>" +
                        "<p>" + user.username + "</p>" +
                        "<p>" + user.email + "</p>" +
                        "<p><button onclick=agreeFreezeUser(" + user.username + ")>同意</button>" +
                        "<button onclick=refuseFreezeUser(" + user.username + ")>拒绝</button></p>";
                    ul.appendChild(li);
                }
            }
        }
    })
}

// 获取所有申请注销的用户
function getAllApplyCancelUser() {
    $.ajax({
        type: 'GET',
        url: '/getAllApplyCancelUser',
        success: function (res) {
            if (res.code === 200) {
                // 获取列表父元素
                let ul = document.querySelector(".cancelApply");
                ul.innerHTML = '';

                // 循环响应一次创建每一行
                for (let user of res.users) {
                    let li = document.createElement("li");
                    li.innerHTML = "<div><img src='https://biao22.oss-cn-guangzhou.aliyuncs.com/" + user.photo +
                        "'></div>" + "<p>" + user.nickname + "</p>" +
                        "<p>" + user.username + "</p>" +
                        "<p>" + user.email + "</p>" +
                        "<p><button onclick=agreeCancelUser(" + user.username + ")>同意</button>" +
                        "<button onclick=refuseCancelUser(" + user.username + ")>拒绝</button></p>";
                    ul.appendChild(li);
                }
            }
        }
    })
}

// 向后端发送冻结请求
function freezeAjax(username) {
    $.ajax({
        url: '/freezeUser',
        type: 'POST',
        data: {
            username: username
        },
        success: function (res) {
            if (res === 200) {
                alert("冻结成功!");
                return true;
            } else {
                alert("冻结失败!");
                return false;
            }
        }
    });

    return true;
}

// 向后端发送恢复正常状态请求
function normalAjax(username) {
    $.ajax({
        url: '/updateNormalUser',
        type: 'POST',
        data: {
            username: username
        },
        success: function (res) {
            if (res === 200) {
                alert("成功!");
                return true;
            } else {
                alert("失败!");
                return false;
            }
        }
    });

    return true;
}

// 向后端发送恢复删除状态请求
function cancelAjax(username) {
    $.ajax({
        url: '/cancelUser',
        type: 'POST',
        data: {
            username: username
        },
        success: function (res) {
            if (res === 200) {
                alert("注销成功!");
                return true;
            } else {
                alert("注销失败!");
                return false;
            }
        }
    });

    return true;
}

// 按钮冻结用户
function freezeUser(username) {
    if (confirm("是否需要冻结用户 " + username + "?") && freezeAjax(username)) {
        // 刷新界面
        location.reload(true);
        switchNormal();
    }
}

// 按钮解冻用户
function unFreezeUser(username) {
    if (confirm("是否需要解冻用户 " + username + "?") && normalAjax(username)) {
        location.reload(true);
        switchFreeze();
    }
}

// 按钮同意用户冻结申请
function agreeFreezeUser(username) {
    if (confirm("是否同意用户 " + username + " 的冻结申请？") && freezeAjax(username)) {
        location.reload(true);
        switchFreezeApply();
    }
}

// 按钮拒绝用户冻结申请
function refuseFreezeUser(username) {
    if (confirm("是否拒绝用户 " + username + " 的冻结申请？") && normalAjax(username)) {
        location.reload(true);
        switchFreezeApply();
    }
}

// 按钮修改用户信息
function updateUser() {
    switchUpdateUser();
}

// 按钮删除用户
function cancelUser(username) {
    if (confirm("是否删除用户 " + username + " ？") && cancelAjax(username)) {
        location.reload(true);
        switchNormal();
    }

}

// 按钮同意用户注销申请
function agreeCancelUser(username) {
    if (confirm("是否同意用户 " + username + " 的注销申请？") && cancelAjax(username)) {
        location.reload(true);
        switchCancelApply();
    }
}

// 按钮拒绝用户注销申请
function refuseCancelUser(username) {
    if (confirm("是否拒绝用户 " + username + " 的注销申请？") && normalAjax(username)) {
        location.reload(true);
        switchCancelApply();
    }
}

// 新增用户
function addUserInfo(){
    let u_div = document.querySelector('.username');
    let n_div = document.querySelector('.nickname');
    let e_div = document.querySelector('.email');
    let p_div = document.querySelector('.password');
    let pp_div = document.querySelector('.password2');
    let ph_div = document.querySelector('.phone');

    // 添加触发输入事件
    u_div.addEventListener('input', function () {
        // 恢复默认样式
        u_div.style.border = '1px solid';
    });
    // 添加触发输入事件
    e_div.addEventListener('input', function () {
        // 恢复默认样式
        e_div.style.border = '1px solid';
    });
    // 添加触发输入事件
    p_div.addEventListener('input', function () {
        // 恢复默认样式
        p_div.style.border = '1px solid';
    });
    // 添加触发输入事件
    pp_div.addEventListener('input', function () {
        // 恢复默认样式
        pp_div.style.border = '1px solid';
    });
    // 添加触发输入事件
    ph_div.addEventListener('input', function () {
        // 恢复默认样式
        ph_div.style.border = '1px solid';
    });

    // 判空
    if (u_div.value == null || u_div.value === '') {
        // 改变样式提醒
        u_div.style.border = '2px solid red';
        return;
    } else if (e_div.value == null || e_div.value === '') {
        // 改变样式提醒
        e_div.style.border = '2px solid red';
        return;
    } else if (p_div.value == null || p_div.value === '') {
        // 改变样式提醒
        p_div.style.border = '2px solid red';
        return;
    } else if (pp_div.value == null || pp_div.value === '') {
        // 改变样式提醒
        pp_div.style.border = '2px solid red';
        return;
    } else if (ph_div.value == null || ph_div.value === '') {
        // 改变样式提醒
        ph_div.style.border = '2px solid red';
        return;
    }
    // 判断两次密码
    if (p_div.value !== pp_div.value) {
        alert("两次密码不一致");
        pp_div.value = '';
        return;
    }

    $.ajax({
        url: '/addUserInfo',
        type: 'POST',
        data: {
            username: u_div.value,
            nickname: n_div.value,
            email: e_div.value,
            password: p_div.value,
            phone: ph_div.value
        },
        success: function (res){
            // 处理响应
            if (res.code === 200) {
                location.reload(true);
                switchNormal();
            } else {
                alert(res.reason);
            }
        }
    })
}

// 修改用户
function updateUser(){
    let u_div = document.querySelector('.Uusername');
    let n_div = document.querySelector('.Unickname');
    let e_div = document.querySelector('.Uemail');
    let p_div = document.querySelector('.Upassword');
    let pp_div = document.querySelector('.Upassword2');
    let ph_div = document.querySelector('.Uphone');

    let req = {
        username: '',
        email: '',
        nickname: '',
        phone: '',
        password: '',
    };

    // 判空
    if (u_div.value !== null || u_div.value !== '') {
        req.username = u_div.value;
    }
    if (e_div.value !== null || e_div.value !== '') {
        req.email = e_div.value;
    }
    if (p_div.value !== null || p_div.value !== '') {
        if (pp_div.value !== "" && pp_div.value != null && p_div.value === pp_div.value) {
            req.password = p_div.value;
        } else if (pp_div.value === null || pp_div.value === "") {
            alert("请确认密码");
            return;
        }
    }
    if (ph_div.value !== null || ph_div.value !== '') {
        req.phone = ph_div.value;
    }
    if(n_div.value !== null || n_div.value !== '') {
        req.nickname = n_div.value;
    }

    if (Object.keys(req).length !== 0) {
        $.ajax({
            url: '/updateUser',
            type: 'POST',
            data: {
                username: req.username,
                email: req.email,
                phone: req.phone,
                password: req.password,
                emailCode: req.emailCode
            },
            success: function (res) {
                console.log(res);
                if (res.code === 200) {
                    location.reload(true);
                    switchNormal();
                } else {
                    alert(res.reason);
                    return;
                }
            }
        })
    }
}