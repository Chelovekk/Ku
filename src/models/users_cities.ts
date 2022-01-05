'use strict';
import {
    Column,
    Model,
    Table,
    DataType,
    AllowNull,
    PrimaryKey,
    AutoIncrement, ForeignKey,
} from "sequelize-typescript";
import {Users} from "./users";
import {Cities} from "./cities";
@Table({
    tableName: 'users_cities',
    timestamps: false
})
export class Users_cities extends Model {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @ForeignKey(()=>Users)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    user_id!: number;

    @ForeignKey(()=>Cities)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    city_id!: number;
};
