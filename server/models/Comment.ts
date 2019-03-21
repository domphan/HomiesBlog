import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from './AbstractTimestamp';
import { Post, User } from './';



@Entity()
export class Comment extends Timestamp {

    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Column('text')
    public textContent: string

    @ManyToOne(type => User, user => user.comments)
    public user: User

    @ManyToOne(type => Post, post => post.comments)
    public post: Post

}