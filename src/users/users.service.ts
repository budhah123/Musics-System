import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { RegisterDTO } from './DTO/Register.DTO';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './DTO/update-user.dto';
import { formateDateTimeUTC } from 'src/Format Date/formateDate';

@Injectable()
export class UsersService {
  constructor(private readonly firebaseService: FirebaseService) {}

async createUser(dto: RegisterDTO) {
  const db = this.firebaseService.getFirestore();

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

  const docRef = await db.collection('users').add({
    FullName: dto.FullName,
    email: dto.email,
    password: hashedPassword, 
    userType: dto.userType, 
    createdAt: formateDateTimeUTC(new Date()),
  });

  return { id: docRef.id, ...dto, password: undefined }; // avoid returning password
}
async findAllUser() {
  const db = this.firebaseService.getFirestore();

  const snapshot = await db.collection(
    'users').get();
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return users;
  
}

async findUserByEmail(email: string) {
  const db = this.firebaseService.getFirestore();

  const snapshot = await db.collection('users')
    .where('email', '==', email.trim().toLowerCase())
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data() as { email: string; password: string } // type casting for safety
  };
}


async deleteUser(id:string) {
  const db = this.firebaseService.getFirestore();
  const userRef = db.collection('users').doc(id);

  const doc = await userRef.get();
  if(!doc.exists) {
    throw new NotFoundException("User not Found");
  }
  await userRef.delete();
  return {message: `User with id ${id} delete successfully`}
}

async updateUser(id: string, dto: UpdateUserDto) {
  const db = this.firebaseService.getFirestore();
  const userRef = db.collection('users').doc(id);

  const doc = await userRef.get();
  if(!doc.exists) {
    throw new NotFoundException("users not found!");
  }

  if (dto.password) {
    dto.password = await bcrypt.hash(dto.password, 10);
  }
   const updateData = {
    ...Object.fromEntries(
      Object.entries(dto).filter(([_, value]) => value !== undefined)
    ),
    updatedAt: formateDateTimeUTC(new Date()),
  };

  await userRef.update(updateData); 

  const updateDoc = await userRef.get();

  return {
    id: updateDoc.id, ...updateDoc.data()
  }
  }
  async isUserSubscribed(userId: string): Promise<boolean> {
    const firestore = this.firebaseService.getFirestore();
    const userDoc = await firestore.collection('users').doc(userId).get();
    if(!userDoc.exists) {
     return false;
    }
    const userData = userDoc.data();
    return userData?.isSubscribed ?? false;
  }
}
    

