FROM golang:latest
WORKDIR /app
COPY . .
RUN go build -o dualtarget-backend .
EXPOSE 8080
CMD ["./dualtarget-backend"]