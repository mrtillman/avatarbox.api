declare namespace Express {
  export interface Request {
    user?: any,
    raw?: any,
    gravatar?: any
    imageRating?: number
  }
}