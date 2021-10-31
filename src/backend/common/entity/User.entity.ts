import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users', { schema: 'yuniq' })
export class User {
  @ApiProperty({
    example: '1',
    description: '유니크한 값입니다.',
  })
  @IsNumber()
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: '2021-10-24',
    description: '유저의 생일 입니다.',
  })
  @IsString({ message: 'birthday 값이 올바르지 않습니다.' })
  @Column('varchar', { name: 'birthday', nullable: true, length: 255 })
  birthday: string | null;

  @ApiProperty({
    example: 'yuniq@gmail.com',
    description: '유저의 이메일 입니다.',
  })
  @IsEmail()
  @Column('varchar', { name: 'email', nullable: true, length: 255 })
  email: string | null;

  @ApiProperty({
    example: 'yuniq',
    description: '유저의 이름 입니다.',
  })
  @IsString({ message: 'name 값이 올바르지 않습니다.' })
  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @ApiProperty({
    example: '남',
    description: '유저의 성별 입니다.',
  })
  @IsString({ message: 'gender 값이 올바르지 않습니다.' })
  @Column('varchar', { name: 'gender', nullable: true, length: 255 })
  gender: string | null;

  @ApiProperty({
    enum: ['google'],
    description: '유저의 snsId와 snsType 값의 합은 유니한 값 입니다.',
  })
  @IsString()
  @Column('varchar', { name: 'snsId', nullable: true, length: 255 })
  @IsNotEmpty()
  snsId: string | null;

  @ApiProperty({
    example: 'apple',
    description: '유저의 snsId와 snsType 값의 합은 유니한 값 입니다.',
  })
  @Column('varchar', { name: 'snsType', nullable: true, length: 255 })
  snsType: string | null;

  @ApiProperty({
    example: 'https://yuniq.com/J9smJXN7',
    description: '유저의 프로필 이미지 주소 입니다.',
  })
  @IsString()
  @Column('varchar', { name: 'profileUrl', nullable: true, length: 255 })
  profileUrl: string | null;

  @ApiProperty({
    example: '2020-02-28 00:08:15',
    description: '데이터 생성일 입니다.',
  })
  @IsString()
  @CreateDateColumn({ type: 'datetime', name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({
    example: '2020-02-28 00:08:15',
    description: '데이터 수정일 입니다.',
  })
  @IsString()
  @UpdateDateColumn({ type: 'datetime', name: 'updatedAt' })
  updatedAt: Date;
}
