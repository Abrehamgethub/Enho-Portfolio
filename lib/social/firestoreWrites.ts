// Firestore write helpers for the social platform
'use client'

import { deleteDoc, doc, getDoc, serverTimestamp, setDoc, addDoc, collection, writeBatch } from 'firebase/firestore'
import { firestore } from '@/lib/firebase'

export type Visibility = 'public' | 'followers'

export interface CreatePostInput {
  uid: string
  authorDisplayName?: string | null
  authorPhotoURL?: string | null
  content: string
  visibility: Visibility
}

export async function upsertUserProfile(input: {
  uid: string
  email?: string | null
  displayName?: string | null
  photoURL?: string | null
}) {
  const userRef = doc(firestore, 'users', input.uid)
  await setDoc(
    userRef,
    {
      uid: input.uid,
      email: input.email ?? null,
      displayName: input.displayName ?? null,
      photoURL: input.photoURL ?? null,
      bio: '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
}

export async function createPost(input: CreatePostInput): Promise<{ postId: string }> {
  const postsRef = collection(firestore, 'posts')
  const postRef = doc(postsRef) // auto-id

  await setDoc(postRef, {
    authorId: input.uid,
    authorDisplayName: input.authorDisplayName ?? null,
    authorPhotoURL: input.authorPhotoURL ?? null,
    content: input.content,
    visibility: input.visibility,
    active: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return { postId: postRef.id }
}

export async function likePost(input: { postId: string; uid: string }) {
  if (!input.postId || !input.uid) throw new Error('Post ID and User ID are required')
  const likeRef = doc(firestore, 'posts', input.postId, 'likes', input.uid)
  await setDoc(
    likeRef,
    {
      userId: input.uid,
      createdAt: serverTimestamp(),
    },
    { merge: true }
  )
}

export async function unlikePost(input: { postId: string; uid: string }) {
  if (!input.postId || !input.uid) throw new Error('Post ID and User ID are required')
  const likeRef = doc(firestore, 'posts', input.postId, 'likes', input.uid)
  await deleteDoc(likeRef)
}

export async function addComment(input: {
  postId: string
  uid: string
  authorDisplayName?: string | null
  authorPhotoURL?: string | null
  text: string
}) {
  if (!input.postId) throw new Error('Post ID is required')
  const commentsRef = collection(firestore, 'posts', input.postId, 'comments')
  const comment = {
    authorId: input.uid,
    authorDisplayName: input.authorDisplayName ?? null,
    authorPhotoURL: input.authorPhotoURL ?? null,
    text: input.text,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    active: true,
  }
  const docRef = await addDoc(commentsRef, comment)
  return { commentId: docRef.id }
}

export async function followUser(input: { uid: string; targetUid: string }) {
  const batch = writeBatch(firestore)
  const followingRef = doc(firestore, 'users', input.uid, 'following', input.targetUid)
  const followersRef = doc(firestore, 'users', input.targetUid, 'followers', input.uid)

  batch.set(followingRef, { createdAt: serverTimestamp() })
  batch.set(followersRef, { createdAt: serverTimestamp() })

  await batch.commit()
}

export async function unfollowUser(input: { uid: string; targetUid: string }) {
  const batch = writeBatch(firestore)
  const followingRef = doc(firestore, 'users', input.uid, 'following', input.targetUid)
  const followersRef = doc(firestore, 'users', input.targetUid, 'followers', input.uid)

  batch.delete(followingRef)
  batch.delete(followersRef)

  await batch.commit()
}

