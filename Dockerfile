#RESCATA IMAGEN DE NODE
FROM node:16-alpine



#CREA DIRECTORIO Y/O SE POSICIONS EN EL
WORKDIR /var/app

#COPIA TODO A DIRECTORIO DE APP
COPY . /var/app


ENV NEXT_PUBLIC_API_URL=/api/inventory/v1

#INSTALACION DE PAQUETES NODE
RUN npm install
RUN npm run build

#CAMBIA PERMISOS DE EJECUCION AL ENTRYPOINT
RUN chmod +x entrypoint.sh

#Define the network ports that this container will listen on at runtime.
EXPOSE 3000

#Configure this container for running as an executable.
ENTRYPOINT [ "/var/app/entrypoint.sh" ]
CMD [ "npm", "run" ,"start" ]