import User from "models/Users";
import MockEntity from "./MockEntity";

const MockUser: User = {
    ...MockEntity,
    avatar: '',
    email: '',
    username: '',
};

export default MockUser;