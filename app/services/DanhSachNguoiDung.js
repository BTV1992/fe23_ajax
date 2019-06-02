function DanhSachNguoiDung() {
    // this.mangNguoiDung = []; bỏ mảng vì bất đồng bộ

    this.layDanhSachNguoiDung = function () {
        //  CÁCH 2  
        return $.ajax({        //  hàm này trả về nguyên 1 cục ajax luôn   
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung`,
            type: "GET"  

        });
        

        // CÁCH 1
        // $.ajax({            // Dùng ajax để láy dữ liệu từ database thông qua đường link API
        //     url: `http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung`, // đường link API
        //     type: "GET"     // dùng phương thức GET là lấy dữ liệu

        // })                              // Chỉ thực hiện 1 trong hai chức năng dưới
        //     .done(function (data) {    // Thành công thì vào done thực hiện
        //         // console.log(data);
        //         // taoBang(data); CÁCH 1

        //     })
        //     .fail(function (err) {      // Thất bại thì vào error thực hiện
        //         console.log(err);

        //     });
            
            // console.log(this.mangNguoiDung); // JVS bất đồng bộ vì đoạn code lấy dữ liệu phía trên được
                                                // thực hiện sau vì chờ dữ liệu
            
    };


    this.themNguoiDung = function (nguoiDung){ // Thêm người dùng bằng ajax
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung`,
            type: "POST",
            data: nguoiDung
        })
        .done(function (data) {
            if(data === "tai khoan da ton tai !"){
                alert(data);
            } else{
                location.reload();
            }
                
            
            // console.log(data);
        })
        .fail(function (err) {
            console.log(err);
        });
    };

    this.xoaNguoiDung = function (nguoiDung){
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${nguoiDung}`,
            type: "DELETE"
        })
        .done(function (data) {  
            console.log(data);
            location.reload();    
        
        })
        .fail(function (err) {
            console.log(err);
        });
    };

    this.layThongTinNguoiDung = function(taiKhoan){
        var mangNguoiDung = JSON.parse(localStorage.getItem("DSND"));
        return mangNguoiDung.find(function(item){
            return item.TaiKhoan === taiKhoan;
        });
    };

    this.capNhatNguoiDung = function(nguoiDung){
        var ngd = JSON.stringify(nguoiDung);
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung`,
            type: "PUT",
            data: ngd,
            contentType: "application/json",
            dataType: "json"    
        })
        .done(function (data) {  
            location.reload();    
        
        })
        .fail(function (err) {
            console.log(err);
        });
    };
};


// CÁCH 1
// function taoBang (mangNguoiDung) {
        
//     // var tlBody = $("#tblDanhSachNguoiDung");
    
//     var content = "";

//     mangNguoiDung.map(function(item, index){
//         content += `
//             <tr>
//                 <td>${index + 1}</td> // Tạo số thứ tự
//                 <td>${item.TaiKhoan}</td>  // Tên giống tên trong dữ liệu
//                 <td>${item.MatKhau}</td>
//                 <td>${item.HoTen}</td>
//                 <td>${item.Email}</td>
//                 <td>${item.SoDT}</td>
//                 <td>
//                     <button id="btnSua" class="btn btn-primary" data-taikhoan="${item.TaiKhoan}">Sửa</button>
//                     <button id="btnXoa" class="btn btn-danger" data-taikhoan="${item.TaiKhoan}">Xóa</button>
//                 </td>
//             </tr>
//         `;
//     });
   
//     // tlBody.html(content);

//     $("#tblDanhSachNguoiDung").html(content); // test
// };