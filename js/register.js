function login() {
    window.location.href = "index.html";
}

// 获取注册验证码
function getRegPhoneCode() {
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
    if (phone == null || phone == '') {
        // 改变样式提醒
        p_div.style.border = '2px solid red';
        // 解除禁用并取消定时器
        p_but.disabled = false;
        clearTimeout(timeoutId);
        return;
    }

    // 交互后端
    $.ajax({
        url: '/getRegPhoneCode',
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
                alert(res.reason);
            }
        }
    })
}

// 注册
function reg() {
    let u_div = document.querySelector('.username');
    let n_div = document.querySelector('.nickname');
    let ph_div = document.querySelector('.phone');
    let v_div = document.querySelector('.verification-input');
    let p_div = document.querySelector('.password');
    let pp_div = document.querySelector('.password2');
    let e_div = document.querySelector('.email');


    // 添加触发输入事件
    u_div.addEventListener('input', function () {
        // 恢复默认样式
        u_div.style.border = '1px solid';
    });
    // 添加触发输入事件
    p_div.addEventListener('input', function () {
        // 恢复默认样式
        p_div.style.border = '1px solid';
    });
    // 添加触发输入事件
    v_div.addEventListener('input', function () {
        // 恢复默认样式
        v_div.style.border = '1px solid';
    });
    // 添加触发输入事件
    e_div.addEventListener('input', function () {
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
    } else if (p_div.value == null || p_div.value === '') {
        // 改变样式提醒
        p_div.style.border = '2px solid red';
        return;
    } else if (v_div.value == null || v_div.value === '') {
        // 改变样式提醒
        v_div.style.border = '2px solid red';
        return;
    } else if (ph_div.value == null || ph_div.value === '') {
        // 改变样式提醒
        ph_div.style.border = '2px solid red';
        return;
    } else if (pp_div.value == null || pp_div.value === '') {
        // 改变样式提醒
        pp_div.style.border = '2px solid red';
        return;
    } else if (e_div.value == null || e_div.value === '') {
        // 改变样式提醒
        e_div.style.border = '2px solid red';
        return;
    }

    // 判断两次密码
    if (p_div.value !== pp_div.value) {
        alert("两次密码不一致");
        pp_div.value = '';
        return;
    }

    // 交互后端
    $.ajax({
        url: '/reg',
        type: 'POST',
        data: {
            username: u_div.value,
            nickname: n_div.value,
            phone: ph_div.value,
            phoneCode: v_div.value,
            password: p_div.value,
            email: e_div.value
        },
        success: function (res) {
            // 处理响应
            if (res.code === 200) {
                location.href = "index.html";
            } else {
                alert(res.reason);
            }
        }
    })
}