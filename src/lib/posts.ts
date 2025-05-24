export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
}

export interface Comment {
    id: string;
    postId: string;
    text: string;
    author: string;
}

const initialPosts: Post[] = [
    {
        id: "1",
        title: "Почему темное бархатное пиво - это лучший выбор на теплый летний вечер?",
        content: "Темное бархатное это выбор человека, который знает чего он хочет, а хочет он пить много и вкусно, и чтобы ему это не надоело. Ведь приятная горечь разбавленная небольшим количеством сахара, чтобы вкус был более кремовым или же бархатным.",
        author: "Пивной сомелье",
    },
    {
        id: "2",
        title: "Искусственный интеллект в 2024 году",
        content: "GPT-4 уже пишет код лучше junior-разработчиков...",
        author: "AI эксперт",
    },
    {
        id: "3",
        title: "ВВЕДИТЕ ЗАГОЛОВОК или почему у нас проблемы с креативностью?",
        content: "Проблема узкости креативного мышления в наши будни связаны с общей ментальной усталостью, которая возникла в связи с политическими проблемами современности,  например санкции в РФ, которые поднимают цены на некоторые продукты питания, из-за чего людям становится грустно(",
        author: "Смехлыст",
    },
];

const initialComments: Comment[] = [
    { id: "1", postId: "1", text: "Согласен, темное бархатное можно пить всю жизнь!", author: "Вася" },
    { id: "2", postId: "2", text: "А когда ИИ заменит тестировщиков?", author: "Петя" },
];

let posts = [...initialPosts];
let comments = [...initialComments];

export const getPosts = async () => posts;
export const getPostById = async (id: string) => posts.find(post => post.id === id);
export const getCommentsByPostId = async (postId: string) =>
    comments.filter(comment => comment.postId === postId);

export const addComment = async (postId: string, text: string, author: string) => {
    const newComment = {
        id: Date.now().toString(),
        postId,
        text,
        author
    };
    comments = [...comments, newComment];
    return newComment;
};

export const _resetData = () => {
    posts = [...initialPosts];
    comments = [...initialComments];
};


export const addPost = async (newPost: Post): Promise<Post> => {
    posts = [newPost, ...posts]
    return newPost
}

export const deletePost = async (id: string) => {
    posts = posts.filter(post => post.id !== id)
    return true
}

export const _resetPosts = () => {
    posts = [...initialPosts]
}