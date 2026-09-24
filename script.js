// ================= COURSE DATA =================

const courses = [

    {
        id: 1,
        title: "تطوير المواقع من الصفر للاحتراف",
        category: "programming",
        categoryName: "برمجة",
        description: "تعلم HTML و CSS و JavaScript وابني مواقع احترافية بنفسك.",
        duration: "42 ساعة",
        students: "5,240",
        rating: "4.9",
        price: "499",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 2,
        title: "UI/UX Design Masterclass",
        category: "design",
        categoryName: "تصميم",
        description: "تعلم تصميم واجهات المستخدم وتجربة المستخدم باستخدام Figma.",
        duration: "28 ساعة",
        students: "3,120",
        rating: "4.8",
        price: "399",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 3,
        title: "Artificial Intelligence",
        category: "ai",
        categoryName: "AI",
        description: "ابدأ رحلتك في الذكاء الاصطناعي وتعلم أساسيات Machine Learning.",
        duration: "35 ساعة",
        students: "4,820",
        rating: "4.9",
        price: "699",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 4,
        title: "Digital Marketing Pro",
        category: "business",
        categoryName: "أعمال",
        description: "تعلم التسويق الرقمي وصناعة المحتوى والإعلانات وتحليل البيانات.",
        duration: "22 ساعة",
        students: "2,840",
        rating: "4.7",
        price: "349",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 5,
        title: "Python Programming",
        category: "programming",
        categoryName: "برمجة",
        description: "تعلم Python من الأساسيات حتى بناء المشاريع الحقيقية.",
        duration: "38 ساعة",
        students: "6,110",
        rating: "4.9",
        price: "449",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 6,
        title: "Graphic Design Complete",
        category: "design",
        categoryName: "تصميم",
        description: "تعلم Photoshop و Illustrator ومبادئ التصميم الاحترافي.",
        duration: "31 ساعة",
        students: "2,390",
        rating: "4.8",
        price: "379",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 7,
        title: "Cyber Security",
        category: "programming",
        categoryName: "أمن سيبراني",
        description: "تعلم أساسيات الأمن السيبراني وحماية الشبكات والتطبيقات.",
        duration: "45 ساعة",
        students: "7,430",
        rating: "4.9",
        price: "599",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 8,
        title: "Business & Entrepreneurship",
        category: "business",
        categoryName: "أعمال",
        description: "تعلم كيف تبدأ مشروعك وتبني استراتيجية عمل قوية.",
        duration: "19 ساعة",
        students: "1,980",
        rating: "4.7",
        price: "299",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85"
    }

];


// ================= STATE =================

let currentCourse = null;


// ================= RENDER COURSES =================

function renderCourses(list = courses) {

    const grid = document.getElementById("courseGrid");

    grid.innerHTML = "";

    if (list.length === 0) {

        grid.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:60px;
                color:#777;
            ">
                <h3>لم نجد أي كورس 😔</h3>
                <p>جرب البحث بكلمة مختلفة.</p>
            </div>
        `;

        return;
    }


    list.forEach(course => {

        const card = document.createElement("article");

        card.className = "course-card";

        card.innerHTML = `

            <div class="course-image">

                <img
                    src="${course.image}"
                    alt="${course.title}"
                >

                <span class="course-tag">
                    ${course.categoryName}
                </span>

                <button
                    class="favorite"
                    onclick="toggleFavorite(this)"
                >
                    <i class="fa-regular fa-heart"></i>
                </button>

            </div>


            <div class="course-body">

                <h3>
                    ${course.title}
                </h3>

                <p class="course-description">
                    ${course.description}
                </p>

                <div class="rating">

                    <i class="fa-solid fa-star"></i>

                    <strong>
                        ${course.rating}
                    </strong>

                    <span>
                        (${course.students} طالب)
                    </span>

                </div>


                <div class="course-footer">

                    <div class="price">
                        ${course.price}
                        <small>جنيه</small>
                    </div>

                    <button
                        class="course-btn"
                        onclick="openCourse(${course.id})"
                    >
                        التفاصيل
                    </button>

                </div>

            </div>
        `;

        grid.appendChild(card);

    });

}


// ================= FILTER =================

function filterCourses(category, button) {

    document
        .querySelectorAll(".filter")
        .forEach(btn => btn.classList.remove("active"));

    if (button) {
        button.classList.add("active");
    }

    if (category === "all") {

        renderCourses(courses);

        return;
    }

    const result =
        courses.filter(
            course => course.category === category
        );

    renderCourses(result);

    document
        .getElementById("courses")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ================= CATEGORY =================

function filterCategory(category) {

    filterCourses(category);

    document
        .getElementById("courses")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ================= SEARCH =================

function openSearch() {

    document
        .getElementById("searchOverlay")
        .classList.add("active");

    document
        .getElementById("searchInput")
        .focus();
}


function closeSearch() {

    document
        .getElementById("searchOverlay")
        .classList.remove("active");

}


function searchCourses() {

    const query =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const result =
        courses.filter(course =>

            course.title
                .toLowerCase()
                .includes(query)

            ||

            course.description
                .toLowerCase()
                .includes(query)

            ||

            course.categoryName
                .toLowerCase()
                .includes(query)

        );


    renderCourses(result);


    document
        .getElementById("courses")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ================= COURSE DETAILS =================

function openCourse(id) {

    const course =
        courses.find(item => item.id === id);

    if (!course) return;

    currentCourse = course;


    document.getElementById("detailImage").src =
        course.image;

    document.getElementById("detailCategory").textContent =
        course.categoryName;

    document.getElementById("detailTitle").textContent =
        course.title;

    document.getElementById("detailDescription").textContent =
        course.description;

    document.getElementById("detailDuration").textContent =
        course.duration;

    document.getElementById("detailStudents").textContent =
        course.students + " طالب";

    document.getElementById("detailRating").textContent =
        course.rating;

    document.getElementById("detailPrice").textContent =
        course.price + " جنيه";


    document
        .getElementById("courseModal")
        .classList.add("active");
}


// ================= ENROLL =================

function enrollCourse() {

    if (!currentCourse) return;

    const user =
        localStorage.getItem("academixUser");

    if (!user) {

        alert("لازم تعمل حساب الأول 🚀");

        closeModals();

        openSignup();

        return;
    }


    let enrolled =
        JSON.parse(
            localStorage.getItem("enrolledCourses") || "[]"
        );


    if (!enrolled.includes(currentCourse.id)) {

        enrolled.push(currentCourse.id);

        localStorage.setItem(
            "enrolledCourses",
            JSON.stringify(enrolled)
        );

        alert(
            `تم الاشتراك في كورس "${currentCourse.title}" 🎉`
        );

    } else {

        alert("أنت مشترك بالفعل في هذا الكورس.");

    }

}


// ================= FAVORITE =================

function toggleFavorite(button) {

    button.classList.toggle("liked");

    const icon =
        button.querySelector("i");

    if (button.classList.contains("liked")) {

        icon.classList.remove("fa-regular");

        icon.classList.add("fa-solid");

    } else {

        icon.classList.remove("fa-solid");

        icon.classList.add("fa-regular");

    }

}


// ================= LOGIN =================

function openLogin() {

    closeModals();

    document
        .getElementById("loginModal")
        .classList.add("active");
}


function login(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;


    const user =
        JSON.parse(
            localStorage.getItem("academixUser")
        );


    if (
        user &&
        user.email === email &&
        user.password === password
    ) {

        alert("تم تسجيل الدخول بنجاح ✅");

        closeModals();

    } else {

        alert(
            "بيانات الدخول غير صحيحة.\nلو أول مرة، أنشئ حساب جديد."
        );

    }

}


// ================= SIGNUP =================

function openSignup() {

    closeModals();

    document
        .getElementById("signupModal")
        .classList.add("active");
}


function signup(event) {

    event.preventDefault();

    const name =
        document.getElementById("signupName").value;

    const email =
        document.getElementById("signupEmail").value;

    const password =
        document.getElementById("signupPassword").value;


    const user = {
        name,
        email,
        password
    };


    localStorage.setItem(
        "academixUser",
        JSON.stringify(user)
    );


    alert(
        `أهلاً ${name} 🎉\nتم إنشاء حسابك بنجاح.`
    );

    closeModals();

}


// ================= SWITCH =================

function switchLogin() {

    closeModals();

    openLogin();

}


function switchSignup() {

    closeModals();

    openSignup();

}


// ================= CLOSE MODALS =================

function closeModals() {

    document
        .querySelectorAll(".modal")
        .forEach(modal => {
            modal.classList.remove("active");
        });

}


// ================= VIDEO =================

function showVideo() {

    alert(
        "🎬 هنا تقدر تضيف فيديو تعريفي بالمنصة من YouTube أو فيديو خاص بك."
    );

}


// ================= ALL COURSES =================

function showAllCourses() {

    document
        .querySelectorAll(".filter")
        .forEach(btn => btn.classList.remove("active"));

    document
        .querySelector(".filter")
        .classList.add("active");

    renderCourses(courses);

}


// ================= MOBILE MENU =================

function toggleMenu() {

    const nav =
        document.querySelector(".navbar nav");

    if (nav.style.display === "flex") {

        nav.style.display = "";

    } else {

        nav.style.display = "flex";

        nav.style.position = "absolute";
        nav.style.top = "82px";
        nav.style.right = "20px";
        nav.style.left = "20px";
        nav.style.padding = "20px";
        nav.style.flexDirection = "column";
        nav.style.background = "white";
        nav.style.borderRadius = "15px";
        nav.style.boxShadow =
            "0 20px 50px rgba(0,0,0,.1)";

    }

}


// ================= ESC =================

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeModals();
        closeSearch();

    }

});


// ================= CLICK OUTSIDE =================

document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("click", event => {

        if (event.target === modal) {

            closeModals();

        }

    });

});


// ================= START =================

renderCourses();
