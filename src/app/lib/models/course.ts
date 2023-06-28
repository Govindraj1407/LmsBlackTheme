export class Course {
  userCourseId: string;
  courseId: string;
  courseName: string;
  category: string;
  courseContent: string;
  subTopics: string;
  link: string;
  userId: string;
  userName: string;
  credits: number;
  progress: number;
  status: string;
  dueDate: string;
  studentCount: number;
}

export class UserCourse {
  userCourseId: string;
  courseId: string;
  userId: string;
  credits?: number;
  progress?: number;
  status?: string;
}


export class AssignCourse {
  userId: string;
  courseId: string;
}