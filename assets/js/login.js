$('#link_reg,#link_login').click(function() {
    $('.login-box, .reg-box').toggle()
})

const form = layui.form
form.verify({
    // 数组方式
    password: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    repwd: (val) => {
        const pwd = $('.reg-box [name=password]').val()
        // 判断两次密码是否一致
        if (pwd !== val) return "两次密码不一致"
    }
})

// const baseUrl = "http://www.liulongbin.top:3007"
// 监听表单提交事件，发送注册请求
$('#form_reg').submit( (e) => {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: "/api/reguser",
        data: {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        },
        success: res => {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg(res.message)
            // 模拟点击事件 跳转到登录
            $("#link_login").click()
            $('#form_login [name=username]').val($("#form_reg [name=username]").val())
            // $('#form_login [name=password]').val($("#form_reg [name=password]").val())

        }
    })
})
// 监听表单登录事件，发送登录请求
$('#form_login').submit( (e) => {
    e.preventDefault();
    const data = $('#form_login').serialize();
    $.ajax({
        method: 'POST',
        url: "/api/login",
        data,
        success: res => {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg(res.message)
            // 1. 要把 token 存在本地 
            localStorage.setItem('token', res.token)
            // 2. 跳转到首页
            location.href = "/index.html"
        }
    })
    
})