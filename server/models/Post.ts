import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from './AbstractTimestamp';
import { Comment, User } from './';


@Entity()
export class Post extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(type => User, user => user.posts)
    @JoinColumn({ name: 'userId' })
    public user: User;

    @Column('varchar', { length: 255 })
    public title: string;

    @Column('text')
    public textContent: string;

    @Column('varchar', { length: 255, nullable: true })
    public mediaUrl: string;


    // todo: array of users
    @Column({ type: 'simple-array', default: '' })
    public likes: User[];

    @OneToMany(type => Comment, comment => comment.post, {
        cascade: true
    })
    public comments: Comment[];
}