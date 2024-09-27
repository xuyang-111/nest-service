/**
 * 用于前端传入的数据进行校验
 */
import { IsBoolean, IsIn, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {

    @ApiProperty({ description: '姓' })
    @IsNotEmpty({ message: 'firstName 不能为空' })
    @IsString({ message: 'firstName 为string类型' })
    readonly firstName: string; 

    @ApiProperty({ description: '名字' })
    @IsNotEmpty({ message: 'lastName 不能为空' })
    @IsString({ message: 'lastName 不能为空' })
    readonly lastName: string;

    @ApiProperty({ description: '性别', enum: (['m', 'w']), required: true })
    @IsNotEmpty({ message: 'sex 不能为空' })
    @IsString({ message: 'sex 为string类型' })
    @IsIn(['m', 'w'], { message: 'sex 在【"m"（男）|"w"（女）】之中取值' })
    readonly sex: string;

    @ApiProperty({ description: "联系方式", required: false })
    @IsOptional() // 可选的
    @IsString({ message: 'phone 为string类型' })
    @IsPhoneNumber('CN', { message: 'phone 需要符合手机号的规范' })
    readonly phone?: string;

    @ApiProperty({ description: "是否激活状态", required: false })
    @IsOptional() // 可选的
    @IsBoolean({ message: 'isActive 为boolean类型' })
    readonly isActive?: boolean;

    @ApiProperty({ description: "出生日期", format: 'YYYY-MM-DD' })
    @IsNotEmpty({ message: 'birthday 不能为空' })
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-((0|1|2)[0-9]|30|31)$/, { message: 'birthday 为YYYY-MM-DD格式的字符串' })
    readonly birthday: Date;
}
