export interface User {
  id: string
  username: string
  at: string
  email: string
  password: string
  bio: string
  profilePicture: string
  followers: number
  following: number
  reputationAverage: number
  videoCount: number
  wantsToLearn: string[]
  wantsToTeach: string[]
}

export interface Video {
  id: string
  userId: string
  matchId: string | null
  url: string
  thumbnail: string
  title: string
  description: string
  tags: string[]
  likes: number
  uploadDate: string
  teaches: string[]
  wantsToLearnInReturn: string[]
}

export interface ReplyData {
  id: string
  parentCommentId: string
  userId: string
  text: string
  date: string
}

export interface CommentData {
  id: string
  videoId: string
  userId: string
  text: string
  date: string
  replies: ReplyData[]
  isOwn?: boolean
}

export interface Match {
  id: string
  user1Id: string
  user2Id: string
  tagOffered: string
  tagRequested: string
  videoSentByUser1: boolean
  videoIdUser1: string | null
  videoSentByUser2: boolean
  videoIdUser2: string | null
  completed: boolean
  date: string
}

export interface SwapRequest {
  id: string
  fromUserId: string
  toUserId: string
  status: 'pending' | 'accepted' | 'rejected'
  tagOffered: string
  tagRequested: string
  date: string
}

export interface Notification {
  id: string
  targetUserId: string
  type: 'like' | 'comment' | 'reply'
  fromUserId: string
  videoId: string
  commentId: string | null
  read: boolean
  date: string
}

export interface Reputation {
  id: string
  fromUserId: string
  toUserId: string
  matchId: string
  rating: number
  likedVideo: boolean
}

export interface Tag {
  id: string
  name: string
}

export interface MatchVideo {
  matchId: string
  userId: string
  videoUrl: string
  uploadDate: string
}

export interface FeedItem {
  user: User
  video: Video
}

export interface DropdownOption {
  id: string
  name: string
}

export interface InputGivyProps {
  label: string
  type?: string
  value?: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  big?: boolean
}

export interface BigButtonProps {
  content: string
  onClick?: () => void
}

export interface EntityCardProps {
  photo?: string
  name?: string
  description?: string
  content?: string
  content2?: string
  desicionButtons?: boolean
  button?: string
  id?: string
  onClick?: () => void
  onAccept?: () => void
  onReject?: () => void
}

export interface DropdownProps {
  label: string
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
}

export interface CircularButtonProps {
  icon: string
  count?: number
  onClick?: () => void
  active?: boolean
}

export interface HeaderProps {
  title: string
}

export interface DescriptionProps {
  username: string
  bio: string
  teaches: string[]
  lookingFor: string[]
}

export interface TagsProps {
  tags: string[]
}

export interface CommentsProps {
  comments: CommentData[]
  onClose: () => void
  onAddComment: (text: string) => void
  onDeleteComment: (commentId: string) => void
}

export interface UploadVideoMatchProps {
  tittle: string
  description: string
  icon: string
  onVideoSelect?: (file: File) => void
  disabled?: boolean
}

export interface SwapOverlayProps {
  visible: boolean
}