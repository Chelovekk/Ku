'use strict';
import {Column, Model, Table, DataType, AllowNull, PrimaryKey, AutoIncrement, BelongsToMany} from "sequelize-typescript";
import {Cities} from "./cities";
import {Users_cities} from "./users_cities";

interface UserAttributes{
    user_type: string,
    messenger_id: number
}

@Table({
    tableName: 'users'
})
export class Users extends Model<UserAttributes> implements UserAttributes{
    @BelongsToMany(()=>Cities, ()=>Users_cities)
    cities!: Cities[]


    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @AllowNull(false)
    @Column({
            type: DataType.ENUM('discord_user', 'telegram_user')
    })
    user_type!: string;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    messenger_id!: number;
};
