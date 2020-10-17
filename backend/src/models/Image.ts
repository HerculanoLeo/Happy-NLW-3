import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import OrphanagesController from '../controllers/OrphanagesController';
import Orphanage from './Ophanage';

@Entity('images')
export class Image {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    path: string

    @ManyToOne(() => Orphanage, orphanage => orphanage.images)
    @JoinColumn({ name: 'id_orphanage' })
    orphanage: Orphanage
}