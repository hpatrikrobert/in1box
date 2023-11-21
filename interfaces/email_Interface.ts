export default interface email {
    _id: string,
    sender: string,
    title: string;
    content: string,
    user_id: string,
    updatedAt: Date,
    createdAt: Date
}