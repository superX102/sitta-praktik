const user = document.getElementById("email");
const pass = document.getElementById("password");
const loginBtn = document.getElementById("login");
const kirimBtn = document.getElementById("kirimLink");
const daftarBtn = document.getElementById("simpanDaftar");
const loginForm = document.getElementById("loginForm");
const formLupaPass = document.getElementById("lupaPaswordForm");
const registerForm = document.getElementById("registerForm");
const registerPesan = document.getElementById("registerPesan");
const pesanLupaPass = document.getElementById("pesanPasswordModal");
const pesan = document.getElementById("pesan");
const lupaPasswordBtn = document.getElementById("lupaPassword");
const modalLupaPassword = document.getElementById("lupaPasswordModal");
const closeModalLupaPassword = document.getElementById("closelupaPassword");
const registerBtn = document.getElementById("register");
const modalRegister = document.getElementById("registerModal");
const closeModalRegister = document.getElementById("closeRegister");

function showPesan(element, text, type) {
  element.textContent = text;
  element.className = `pesan ${type}`;

  if (type === "success") {
    setTimeout(() => {
      element.className = "pesan";
    }, 3000);
  }
}

function setLoading(button, isLoading) {
  button.disabled = isLoading;
  if (isLoading) {
    button.innerHTML = '<span class="spinner"></span>Loading...';
  } else {
    const buttonArray = {
      login: "Login",
      kirimLink: "Kirim Link Reset",
      simpanDaftar: "Daftar Sekarang",
    };
    button.textContent = buttonArray[button.id] || "submit";
  }
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userTokenKey = "authToken";
  const userNameKey = "user";
  const username = user.value.trim();
  const password = pass.value.trim();
  const validasiLogin = dataPengguna.find((pengguna) => {
    return pengguna.email === username && pengguna.password === password;
  });

  setLoading(loginBtn, true);
  const tempToken = `Prz${Date.now()}${Math.random()
    .toString(20)
    .substring(2, 9)}`;
  localStorage.setItem(userTokenKey, tempToken);

  token = localStorage.getItem(userTokenKey);

  setTimeout(() => {
    if (validasiLogin && token) {
      let nama = validasiLogin.nama;
      localStorage.setItem(userNameKey, nama);

      showPesan(pesan, "Login berhasil! Mengalihkan...", "success");
      loginForm.reset();
      setTimeout(() => {
        window.location = "dashboard.html";
      }, 1500);

      console.log(`token ${token}`);
      console.log("login berhasil");
    } else {
      showPesan(pesan, "Gagal Email atau Password Salah", "error");
      loginForm.reset();
      console.log("login gagal");
    }
    setLoading(loginBtn, false);
  }, 1000);
});

function openModal(modal) {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}
registerBtn.addEventListener("click", () => {
  openModal(modalRegister);
  console.log("open modal");
});

lupaPasswordBtn.addEventListener("click", () => {
  openModal(modalLupaPassword);
  console.log("open modal");
});

function closeModal(modal) {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

closeModalLupaPassword.addEventListener("click", () => {
  closeModal(modalLupaPassword);
  console.log("close modal");
});

closeModalRegister.addEventListener("click", () => {
  closeModal(modalRegister);
  console.log("close modal");
});

formLupaPass.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("lupaEmail").value.trim();

  if (!email) {
    showPesan(pesanLupaPass, "Email tidak boleh kosong", "error");
    return;
  }
  console.log(email);
  setLoading(kirimBtn, true);

  const validasiEmail = dataPengguna.find((pengguna) => {
    return pengguna.email === email;
  });
  if (validasiEmail) {
    setTimeout(() => {
      showPesan(
        pesanLupaPass,
        "Link reset password telah dikirim ke email Anda!",
        "success"
      );
      setLoading(kirimBtn, false);

      setTimeout(() => {
        closeModal(modalLupaPassword);
        formLupaPass.reset();
        pesanLupaPass.className = "message";
      }, 2000);
    }, 1500);
  } else {
    setTimeout(() => {
      showPesan(
        pesanLupaPass,
        "Email tidak ditemukan, masukan email dengan benar!",
        "error"
      ),
        setLoading(kirimBtn, false);
    }, 2000);
  }
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const namaLengkap = document.getElementById("namaLengkap").value.trim();
  const email = document.getElementById("emailBaru").value.trim();
  const password = document.getElementById("passwordBaru").value;
  const lokasi = document.getElementById("lokasiBaru").value;

  if (password.length < 8) {
    setTimeout(() => {
      showPesan(registerPesan, "Password minimal 8 karakter!", "error");
    }, 1500);
    return;
  }

  const cekEmail = dataPengguna.some((pengguna) => pengguna.email === email);
  if (cekEmail) {
    setTimeout(() => {
      showPesan(
        registerPesan,
        "Email sudah terdaftar. Silakan gunakan email lain.",
        "error"
      );
    }, 1500);
    return;
  }

  setLoading(daftarBtn, true);

  const newId = dataPengguna.length + 1;
  const newUser = {
    id: newId,
    nama: namaLengkap,
    email: email,
    password: password,
    role: "UPBJJ-UT",
    lokasi: lokasi,
  };

  dataPengguna.push(newUser);

  showPesan(registerPesan, "Pendaftaran berhasil! Silakan login.", "success");

  setLoading(daftarBtn, false);

  setTimeout(() => {
    closeModal(modalRegister);
    registerForm.reset();
    registerPesan.className = "message";

    console.log("Data Pengguna Baru:", dataPengguna);
  }, 2000);
});