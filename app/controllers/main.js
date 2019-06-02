$(document).ready(function () {

    var danhSachNguoiDung = new DanhSachNguoiDung();

    layDanhSachNguoiDung();

    function layDanhSachNguoiDung() {
        // CÁCH 2
        danhSachNguoiDung.layDanhSachNguoiDung()
            .done(function (result) {
                localStorage.setItem("DSND", JSON.stringify(result));
                taoBang(result);
            })
            .fail(function (err) {
                console.log(err);
            });

        // danhSachNguoiDung.layDanhSachNguoiDung(); CÁCH 1
        // taoBang(danhSachNguoiDung.mangNguoiDung); phương thức tạo bảng đã được thực hiện bên DSND
        // console.log(danhSachNguoiDung.mangNguoiDung);


    };

    $("#btnThemNguoiDung").click(function () {
        $("#TaiKhoan").removeAttr("disabled");
        showPopup("Thêm người dùng", "Thêm", "btnThem");
    });


    $("body").delegate(".btnSua", "click", function () {
        showPopup("Sửa người dùng", "Sửa", "btnSua");
    });

    function showPopup(title, titleButton, idBtn) {
        var title = title;
        var footer = `
            <button id="${idBtn}" class="btn btn-success">${titleButton}</button>
            <button id="btnDong" class="btn btn-danger" data-dismiss="modal">Đóng</button>
        `;
        $(".modal-title").html(title);
        $(".modal-footer").html(footer);
    };


    // $("#btnThem").click(function(){ không được vì nó tạo ra sau html

    // }

    $("body").delegate("#btnThem", "click", function () {
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDT = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDung").val();

        var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, loaiNguoiDung);

        danhSachNguoiDung.themNguoiDung(nguoiDung);

        // console.log(nguoiDung);

    });

    function taoBang(mangNguoiDung) {

        // var tlBody = $("#tblDanhSachNguoiDung");

        var content = "";

        mangNguoiDung.map(function (item, index) {
            content += `
                <tr>
                    <td>${index + 1}</td> // Tạo số thứ tự
                    <td>${item.TaiKhoan}</td>  // Tên giống tên trong dữ liệu
                    <td>${item.MatKhau}</td>
                    <td>${item.HoTen}</td>
                    <td>${item.Email}</td>
                    <td>${item.SoDT}</td>
                    <td>${item.TenLoaiNguoiDung}</td>
                    <td>
                        <button class="btn btn-primary btnSua" data-toggle="modal" data-target="#myModal"
                        data-taikhoan="${item.TaiKhoan}">Sửa</button>
                        <button class="btn btn-danger btnXoa" data-taikhoan="${item.TaiKhoan}">Xóa</button>
                    </td>
                </tr>
            `;
        });

        // tlBody.html(content);

        $("#tblDanhSachNguoiDung").html(content); // test
    };

    $("body").delegate(".btnXoa", "click", function () {
        var taiKhoan = $(this).data("taikhoan");
        console.log(taiKhoan);
        danhSachNguoiDung.xoaNguoiDung(taiKhoan);
    });

    $("body").delegate(".btnSua", "click", function () {
        var taiKhoan = $(this).data("taikhoan");
        var nguoiDung = danhSachNguoiDung.layThongTinNguoiDung(taiKhoan);
        
        $("#TaiKhoan").val(nguoiDung.TaiKhoan);

        $("#TaiKhoan").attr("disabled", true);

        $("#HoTen").val(nguoiDung.HoTen);
        $("#MatKhau").val(nguoiDung.MatKhau);
        $("#Email").val(nguoiDung.Email);
        $("#SoDienThoai").val(nguoiDung.SoDT);
        $("#loaiNguoiDung").val(nguoiDung.MaLoaiNguoiDung);
    });

    $("body").delegate("#btnCapNhat", "click", function(){
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDT = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDung").val();

        var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, loaiNguoiDung);

        danhSachNguoiDung.capNhatNguoiDung(nguoiDung);
    })

});
