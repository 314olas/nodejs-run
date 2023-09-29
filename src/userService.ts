import { users } from "./mockedData";
import { Hobbies, User } from "./types";

export class UserService {
    private static instance: UserService | null = null;

    private usersData: User[] = [];

    private constructor() {
        this.usersData = users;
    }

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    getAllUsers(): User[] {
        return this.usersData;
    };

    getUserById(id: number): Omit<User, 'hobbies'> | null {
        const user = this.usersData.find(user => user.id === id) as User || null;
        if (user) {
            const {hobbies, ...reternedUser} = user
            return reternedUser
        }

        return null
        
    };

    getUserHobbies(id: number): Hobbies | null {
        const user = this.usersData.find(user => user.id === id);
        
        return user?.hobbies || null
    };

    createUser(user: Omit<User, 'id'>): User | null {
        if (user) {
            const newUser: User = {
                ...user,
                id: Date.now()
            }
            this.usersData.push(newUser)

            return newUser
        } 

        return null
    }

    deleteUser(id: number): User | null {

         this.usersData = this.usersData.filter(user => user.id !== id);

         return this.usersData[this.usersData.findIndex(({ id: userId }) => userId === id)] || null 

    }

    updateUser(id: number, partialUser: Partial<Omit<User, "id">>): User | null {
        if (id && partialUser) {
            const index = this.usersData.findIndex(({ id: userId }) => userId === id);

            if (index !== -1) {
                const currentUser = this.usersData[index];
                const updatedUser = {
                    ...currentUser,
                    ...partialUser
                 };

                this.usersData[index] = updatedUser;
                return updatedUser;
            }

            return null
        }

        return null
    }

    addHobbyToUser(id: number, hobby: string): Hobbies | unknown {
        if (id && hobby) {
            const index = this.usersData.findIndex(({id: userId}) => userId === id);

            if (index !== -1) {
                const { hobbies } = this.usersData[index];
                if (!hobbies.includes(hobby)) {
                    this.usersData[index].hobbies.push(hobby);
                }

                return this.usersData[index].hobbies;
            }

            return null
        }

        return null
    }

    deleteHobbyFromUser(id: number, hobby: string): Hobbies | unknown {
        if (id && hobby) {
            const index = this.usersData.findIndex(({id: userId}) => userId === id);
            if (index !== -1) {
                const filteredHobbies = this.usersData[index].hobbies.filter((userHobby) => userHobby !== hobby)
                this.usersData[index].hobbies = filteredHobbies;
                return filteredHobbies;
            }
        }

        return null
    }

}