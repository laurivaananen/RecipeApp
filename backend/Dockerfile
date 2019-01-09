from ../frontend/. as bd

COPY --from=bd /app/build /usr/src/app/static

from python:3

WORKDIR /usr/src/app

ENV PYTHONUNBUFFERED 1

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt && \
    useradd -m app && \
    chown -R app .

USER app

COPY . .

RUN python manage.py migrate && \
    python manage.py loaddata categories

EXPOSE 8002

CMD ["gunicorn", "-b", "0.0.0.0:8002", "cooking.wsgi"]