import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment, User } from './';

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => User, user => user.posts)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column('varchar', { length: 255 })
    title: string;

    @Column('text')
    textContent: string;

    @Column('varchar', { length: 255, nullable: true })
    mediaUrl: string;

    // todo: array of users
    @Column({ type: 'simple-array', default: '' })
    likes: User[];

    @OneToMany(type => Comment, comment => comment.post, {
        cascade: true
    })
    comments: Comment[];
}