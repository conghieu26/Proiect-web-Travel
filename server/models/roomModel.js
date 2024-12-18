import db from "../utils/db.js";

export default {
  // Lấy tất cả phòng
  getAll() {
    return db("phong");
  },
  getAllByKhachSan(id) {
    return db("phong").where("IDKhachSan", id);
  },
  getAllByKhachSanTrangThai(id) {
    return db("phong").where("IDKhachSan", id).andWhere("TrangThai", "!=", 2);
  },
  getEndow(id) {
    return db.raw(
      `SELECT * FROM uudai_phong up, uudai u WHERE u.ID=up.IDUuDai AND up.IDPhong=?`,
      id
    );
  },
  getGiaMin(id) {
    return db("phong").where("IDKhachSan", id).min("Gia").as("Gia");
  },
  getHinhAnh(id) {
    return db("hinhanh_phong").where("IDPhong", id);
  },
  getGiaMax(id) {
    return db("phong")
      .select("TenLoaiPhong")
      .where("IDKhachSan", id)
      .orderBy("Gia", "desc")
      .limit(1)
      .first();
  },
  async add(phong) {
    // console.log(user.password);
    const result = await db("phong").insert(phong);
    console.log(result);
    return result[0];
  },
  updateRoom(phong) {
    return db("phong").where("ID", phong.ID).update(phong);
  },

  // Lấy phòng theo ID
  getRoomByID(id) {
    return db("phong").where("ID", id);
  },

  // Lấy phòng theo id khách sạn
  getAllByKhachSan(id) {
    return db("phong").where("IDKhachSan", id);
  },

  // Lấy hình ảnh phòng
  async getImage(id) {
    return await db("hinhanh_phong").where("IDPhong", id);
  },

  // Lấy giường của phòng
  async getGiuong(id, index) {
    return await db("giuong_phong")
      .where("IDPhong", id)
      .andWhere("IDGiuong", index);
  },

  // Cập nhật phòng
  updateRoom(phong) {
    return db("phong").where("ID", phong.ID).update(phong);
  },

  // Xóa phòng
  delRoom(id) {
    return db("phong").where("ID", id).del();
  },

  updateTrangThai(id, trangthai) {
    return db("phong").where("ID", id).update({ TrangThai: trangthai });
  },
  // async updateSoPhong(id) {
  //   const [phong] = await db("phong").where("ID", id);
  //   return await db("phong")
  //     .where("ID", id)
  //     .update({ SoPhongTrong: phong.SoPhongTrong - 1 });
  // },
  // async updateCongPhong(id) {
  //   const [phong] = await db("phong").where("ID", id);
  //   console.log(phong);
  //   return await db("phong")
  //     .where("ID", id)
  //     .update({ SoPhongTrong: phong.SoPhongTrong + 1 });
  // },
};
