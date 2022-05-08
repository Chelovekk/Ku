'use strict';
import {
    Column,
    Model,
    Table,
    DataType,
    AllowNull,
    PrimaryKey,
    AutoIncrement,
    HasOne, BelongsTo, HasMany
} from "sequelize-typescript";
import {Cities} from "./cities";
import {Users_cities} from "./users_cities";
import {BilingsData} from "./biling_data";
import {Logs} from "./logs";

interface UserAttributes {
    user_type: string,
    messenger_id: number
}

@Table({
    tableName: 'log_types'
})
export class LogTypes extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    id!: number;


    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    type!: string

    @HasMany(() => Logs)
    logs!: Logs;
};
