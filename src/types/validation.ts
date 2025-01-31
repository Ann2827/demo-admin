export interface IProfile {
  /**
   * @minLength 1
   */
  email: string;
}

export interface IPost {
  id: number;
  authorId: number;
  title: string;
  body: string;
}

export interface IUser {
  id: number;
  email: string;

  /**
   * @minLength 1
   */
  firstName: string;

  /**
   * @minLength 1
   */
  lastName: string;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: 'Backlog' | 'Ready' | 'In Progress' | 'Done' | 'Archived';
}
