// 获取登录界面选择层两个标签
let login_pass = document.getElementById("login-pass");
let login_phone = document.getElementById("login-phone");
// 获取用户名和手机的输入框
let pass_input = document.getElementById("pass-input");
let phonp_input = document.getElementById("phone-input");
// 初始隐藏手机
phonp_input.style.display = "none";

// 初始化选择层的点击效果
function init() {
    // 给账户密码登录标签设置点击事件
    login_pass.addEventListener('click', function () {
        // 切换样式
        login_pass.style.color = "rgb(76,154,255)";
        login_pass.style.borderBottom = "2px solid rgba(24,144,255)";
        login_phone.style.color = "black";
        login_phone.style.borderBottom = "";

        // 隐藏手机登录，显示账号密码登录
        pass_input.style.display = "";
        phonp_input.style.display = "none";
    });

    // 给手机登录标签设置点击事件
    login_phone.addEventListener('click', function () {
        // 切换样式
        login_phone.style.color = "rgb(76,154,255)";
        login_phone.style.borderBottom = "2px solid rgba(24,144,255)";
        login_pass.style.color = "black";
        login_pass.style.borderBottom = "none";

        // 隐藏手机登录，显示账号密码登录
        pass_input.style.display = "none";
        phonp_input.style.display = "";
    });
}

init();

// 注册按钮
function reg() {
    window.location.href = 'register.html';
}

// 获取登录验证码
function getLoginphoneCode() {
    let p_div = document.querySelector('.phone');
    let p_but = document.querySelector('.verification-button');
    let phone = p_div.value;

    // 禁用按钮
    p_but.disabled = true;
    // 添加按钮解除禁用定时器
    let timeoutId = setTimeout(function () {
        p_but.disabled = false;
    }, 60000);

    // 添加触发输入事件
    p_div.addEventListener('input', function () {
        // 恢复默认样式
        p_div.style.border = '1px solid';
    })

    // 判空
    if (phone === null || phone === '') {
        // 改变样式提醒
        p_div.style.border = '2px solid red';
        // 解除禁用并取消定时器
        p_but.disabled = false;
        clearTimeout(timeoutId);
        return;
    }

    // 交互后端
    $.ajax({
        url: '/getLoginPhoneCode',
        type: 'POST',
        data: {
            phone: phone
        },
        success: function (res) {
            // 处理响应
            if (res === 200) {
            } else {
                // 解除禁用并取消定时器
                p_but.disabled = false;
                clearTimeout(timeoutId);
                alert("该手机用户不存在");
            }
        }
    })
}

// 根据用户名取消申请冻结或注销
function cancelFreezeOrLogoffName(username, password) {
    $.ajax({
        type: "POST",
        url: "/cancelFreezeOrLogoffName",
        data: {username: username},
        success: function (res) {
            if (res === 200) {
                loginPass(username, password);
            }
        }
    })
}

// 根据手机取消申请冻结或注销
function cancelFreezeOrLogoffphone(phone, phoneCode) {
    $.ajax({
        type: "POST",
        url: "/cancelFreezeOrLogoffphone",
        data: {phone: phone},
        success: function (res) {
            if (res === 200) {
                loginphone(phone, phoneCode);
            }
        }
    })
}

function login() {
    // 用户名密码登录
    if (window.getComputedStyle(phonp_input).display === 'none') {
        // 账号密码
        let u_div = document.querySelector('.username');
        let p_div = document.querySelector('.password');
        let username = u_div.value;
        let password = p_div.value;

        // 添加触发输入事件
        u_div.addEventListener('input', function () {
            // 恢复默认样式
            u_div.style.border = '1px solid';
        })
        p_div.addEventListener('input', function () {
            // 恢复默认样式
            p_div.style.border = '1px solid';
        })

        // 判空
        if (username === null || username === '') {
            // 改变样式提醒
            u_div.style.border = '2px solid red';
            return;
        } else if (password === null || password === '') {
            // 改变样式提醒
            p_div.style.border = '2px solid red';
            return;
        }

        // 交互后端
        loginPass(username, password);

    } else {
        // 手机登录
        let p_div = document.querySelector('.phone');
        let v_div = document.querySelector('.verification-input');
        let phone = p_div.value;
        let veri = v_div.value;

        // 添加触发输入事件
        p_div.addEventListener('input', function () {
            // 恢复默认样式
            p_div.style.border = '1px solid';
        })
        v_div.addEventListener('input', function () {
            // 恢复默认样式
            v_div.style.border = '1px solid';
        })

        // 判空
        if (phone === null || phone === '') {
            // 改变样式提醒
            p_div.style.border = '2px solid red';
            return;
        } else if (veri === null || veri === '') {
            // 改变样式提醒
            v_div.style.border = '2px solid red';
            return;
        }

        // 交互后端
        loginphone(phone, veri);
    }
}

function loginPass(username, password) {
    $.ajax({
        url: '/login-pass',
        type: 'POST',
        data: {
            username: username,
            password: password
        },
        success: function (res) {
            // 处理响应
            if (res.code === 200 && res.userInfo.state === 1 && res.userInfo.grade === 0) {
                // 普通用户
                location.href = 'clientUser.html';
            } else if (res.code === 200 && res.userInfo.state === 1 && res.userInfo.grade === 1) {
                // 管理员
                location.href = 'clientAdmin.html';
            } else if (res.code === 3) {
                // 账号已被冻结
                alert("账号已被冻结，请联系管理员进行账号解冻！");
            } else if (res.code === 2) {
                // 账号正在申请冻结或注销
                if (confirm("该账号正在申请冻结或注销，登录后将自动取消，是否登录？")) {
                    // 取消申请冻结或注销
                    cancelFreezeOrLogoffName(username, password);
                }
            }
        }
    })
}

function loginphone(phone, phoneCode) {
    $.ajax({
        url: '/login-phone',
        type: 'POST',
        data: {
            phone: phone,
            code: phoneCode
        },
        success: function (res) {
            // 处理响应
            if (res.code === 200 && res.userInfo.state === 1 && res.userInfo.grade === 0) {
                // 普通用户
                location.href = 'clientUser.html';
            } else if (res.code === 200 && res.userInfo.state === 1 && res.userInfo.grade === 1) {
                // 管理员
                location.href = 'clientAdmin.html';
            } else if (res.code === 3) {
                // 账号已被冻结
                alert("账号已被冻结，请联系管理员进行账号解冻！");
            } else if (res.code === 2) {
                // 账号正在申请冻结或注销
                if (confirm("该账号正在申请冻结或注销，登录后将自动取消，是否登录？")) {
                    // 取消申请冻结或注销
                    cancelFreezeOrLogoffphone(phone, phoneCode);
                }
            }
        }
    })
}