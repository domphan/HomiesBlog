import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment, Post } from '.';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 255 })
    firstName: string;

    @Column('varchar', { length: 255 })
    lastName: string;

    @Column('date')
    birthday: Date;

    @Column('varchar', { length: 255 })
    username: string;

    @Column('varchar', { length: 255 })
    email: string;

    @Column('text', { nullable: true })
    password: string;

    @OneToMany(type => Post, post => post.user, {
        cascade: true
    })
    @JoinColumn()
    posts: Post[];

    @OneToMany(type => Comment, comment => comment.user, {
        cascade: true
    })

    @JoinColumn()
    comments: Comment[];

    @JoinColumn()
    friends: User[]
}
