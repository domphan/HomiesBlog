import {
    BeforeInsert,
    BeforeUpdate,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

export abstract class Timestamp {
    @CreateDateColumn({ select: true })
    public createdAt: Date


    @UpdateDateColumn({ select: false })
    public updatedAt: Date

    @BeforeInsert()
    public createDates() {
        this.createdAt = new Date()
    }

    @BeforeUpdate()
    public updateDates() {
        this.updatedAt = new Date()
    }
}