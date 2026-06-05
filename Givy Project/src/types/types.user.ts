export interface User {
  id: string
  created_at: string
  username: string
  email: string
  bio: string | null
  followers: number
  following: number
  reputation: number
  at: string | null
  profilePicture: string | null
  wantsToLearn: string | null
  wantsToTeach: string | null
}

export interface Video {
  id: string
  created_at: string
  URL: string
  user_id: string
  match_id: string | null
  description: string | null
  likes: number
  teaches: string
  wantsToLearn: string
}