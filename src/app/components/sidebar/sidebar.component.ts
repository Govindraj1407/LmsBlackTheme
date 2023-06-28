import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  // rtlTitle: string;
  // icon: string;
  // class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard"
  },
  {
    path: "/courseeditor",
    title: "Course Editor"
  },
 
  {
    path: "/resourcelists",
    title: "Resourses"
  },
  {
    path: "/usereditor",
    title: "User Editor"
  },
  {
    path: "/managestudents",
    title: "Manage Students"
  },
  {
    path: "/login",
    title: "Logout"
  },
  // {
  //   path: "/icons",
  //   title: "Icons",
  //   rtlTitle: "الرموز",
  //   icon: "icon-atom",
  //   class: ""
  // },
  // {
  //   path: "/maps",
  //   title: "Maps",
  //   rtlTitle: "خرائط",
  //   icon: "icon-pin",
  //   class: "" },
  // {
  //   path: "/notifications",
  //   title: "Notifications",
  //   rtlTitle: "إخطارات",
  //   icon: "icon-bell-55",
  //   class: ""
  // },

  // {
  //   path: "/user",
  //   title: "User Profile",
  //   rtlTitle: "ملف تعريفي للمستخدم",
  //   icon: "icon-single-02",
  //   class: ""
  // },
  // {
  //   path: "/tables",
  //   title: "Table List",
  //   rtlTitle: "قائمة الجدول",
  //   icon: "icon-puzzle-10",
  //   class: ""
  // },
  // {
  //   path: "/typography",
  //   title: "Typography",
  //   rtlTitle: "طباعة",
  //   icon: "icon-align-center",
  //   class: ""
  // },
  // {
  //   path: "/rtl",
  //   title: "RTL Support",
  //   rtlTitle: "ار تي ال",
  //   icon: "icon-world",
  //   class: ""
  // }
];

export const STUDENTROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard"
  },
  {
    path: "/login",
    title: "Logout"
  },
];

export const INSTRUCTORROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard"
  },
  {
    path: "/courseeditor",
    title: "Course Editor"
  },
  {
    path: "/managestudents",
    title: "Manage Students"
  },
  {
    path: "/login",
    title: "Logout"
  }
];


@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem("user-session"));      
    if (user?.role === "Student") {
      this.menuItems = STUDENTROUTES.filter(menuItem => menuItem);
    }
    else if(user?.role === "Admin"){
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    else if(user?.role === "Instructor"){
      this.menuItems = INSTRUCTORROUTES.filter(menuItem => menuItem);
    }
    else{
      this.menuItems = [];
    }
    
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
