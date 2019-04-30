import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { Timestamp } from './AbstractTimestamp';
import { Comment, Post } from './';
import { UserRelationship } from '.';

@Entity()
export class User extends Timestamp {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('varchar', { length: 255 })
    public firstName: string;

    @Column('varchar', { length: 255 })
    public lastName: string;

    @Column('date')
    public birthday: Date;

    @Column('varchar', { length: 255 })
    public username: string;

    @Column('varchar', { length: 255 })
    public email: string;

    @Column('text', { nullable: true })
    public password: string;

    @Column('varchar', { length: 255, nullable: true })
    public aboutMe: string;

    @Column('varchar', { length: 255, nullable: true })
    public profilePic: string;

    @OneToMany(type => Post, post => post.user, {
        cascade: true
    })
    @JoinColumn()
    public posts: Post[];

    @OneToMany(type => Comment, comment => comment.user, {
        cascade: true
    })
    @JoinColumn()
    public comments: Comment[];

    @OneToMany(type => UserRelationship, relationship => relationship.me)
    @JoinTable({ name: 'user_relationships' })
    public relationships: UserRelationship[];
}
