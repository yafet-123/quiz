import { prisma } from '../../util/db.server.js'

export default async function handlesearchadmin(req, res){
    const { searchName, type } = req.body
    console.log(req.body)
    if (type == 1) {
        const searchData = await prisma.User.findMany({
            where: {
                UserName: {
                    contains: searchName,
                    mode: "insensitive",
                },
            },
        })

        const AllData = searchData.map((data)=>({
            user_id:data.user_id,
            UserName:data.UserName,
            email:data.email,
            CreatedDate:data.CreatedDate,
            ModifiedDate:data.ModifiedDate
        }))

        res.json(AllData)

    } else if(type == 2){ 
        const searchData = await prisma.Students.findMany({
            where: {
                UserName: {
                    contains: searchName,
                    mode: "insensitive",
                },
            },
            include:{
                User:{
                    select:{
                        UserName:true
                    }
                }
            }
        })
        
        const AllData = searchData.map((data)=>({
            students_id:data.students_id,
            UserName:data.UserName,
            email:data.email,
            CreatedDate:data.CreatedDate,
            ModifiedDate:data.ModifiedDate
        }))

        res.json(AllData)
    } else if(type == 3){
        const searchData = await prisma.Teacher.findMany({
            where: {
                UserName: {
                    contains: searchName,
                    mode: "insensitive",
                },
            },
            include:{
                User:{
                    select:{
                        UserName:true
                    }
                }
            }
        })
        
        const AllData = searchData.map((data)=>({
            teacher_id:data.teacher_id,
            UserName:data.UserName,
            email:data.email,
            CreatedDate:data.CreatedDate,
            ModifiedDate:data.ModifiedDate
        }))

        res.json(AllData)
    } else if (type == 4){
        const searchData = await prisma.Location.findMany({
            where: {
                LocationName: {
                    contains: searchName,
                    mode: "insensitive",
                },
            },
            include:{
                User:{
                    select:{
                        UserName:true
                    }
                },
            }
        })

        const AllData = searchData.map((data)=>({
            location_id:data.location_id,
            LocationName:data.LocationName,
            Image:data.Image,
            CreatedDate:data.CreatedDate,
            ModifiedDate:data.ModifiedDate,
            userName:data.User.UserName,
        }))

        res.json(AllData)
    }


}